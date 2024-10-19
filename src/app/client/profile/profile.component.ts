import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {BsModalService} from "ngx-bootstrap/modal";
import {NgxSpinnerService} from "ngx-spinner";
import {GetHeaderService} from "../../common/get-headers/get-header.service";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {UpdateProfileComponent} from "./update-profile/update-profile.component";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    currentUser: any;
    avatarSrc: string = '';
    formData = new FormData();

    constructor(private toast: ToastrService,
                private http: HttpClient,
                private modal: NzModalService,
                private bsModalService: BsModalService,
                private spinner: NgxSpinnerService,
                private getHeaderService: GetHeaderService) {
    }

    ngOnInit(): void {
        const headers = this.getHeaderService.getHeaderAuthentication();
        this.http.get('/api/user/get-profile', {
            headers
        })
            .subscribe((res: any) => {
                if (res?.success) {
                    this.currentUser = res?.data;
                    this.avatarSrc = this.currentUser?.avatar;
                } else {
                    this.toast.error(res?.message);
                }
            })
    }

    openFormEditInfo() {
        this.bsModalService.show(UpdateProfileComponent, {
            class: 'modal-lg modal-dialog-centered',
        });
    }

    openFormChangePassword() {
        this.bsModalService.show(ChangePasswordComponent, {
            class: 'modal-lg modal-dialog-centered',
        });
    }

    handleFileInput($event: any) {
        const file = $event.target.files[0];
        this.handleFiles(file);
    }

    handleFiles(file: any) {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.avatarSrc = `${e.target?.result}`;
                this.formData.append('file', file);
                this.uploadAvatar();
            };
            reader.readAsDataURL(file);
        }
    }

    uploadAvatar() {
        const confirmModal: NzModalRef = this.modal.create({
            nzTitle: `Xác nhận`,
            nzContent: `Bạn có muốn chắc chắn cập nhật ảnh đại diện không?`,
            nzCentered: true,
            nzFooter: [
                {
                    label: 'Hủy',
                    onClick: () => confirmModal.destroy()
                }, {
                    label: 'Đồng ý',
                    type: 'primary',
                    onClick: () => {
                        this.spinner.show().then(r => r);
                        this.http.post<any>('/api/upload-file', this.formData)
                            .subscribe((res: any) => {
                                if (res?.success) {
                                    this.http.post<any>('/api/user/update-avatar', {avatar: res?.data})
                                        .subscribe((res: any) => {
                                            if (res?.success) {
                                                this.toast.success(res?.message);
                                            } else {
                                                this.toast.error(res?.message);
                                            }
                                            this.spinner.hide().then(r => r);
                                            confirmModal.destroy();
                                        });
                                } else {
                                    this.toast.error(res?.message);
                                    this.spinner.hide().then(r => r);
                                }
                            });
                    }
                }
            ]
        });


    }

    triggerFileInput(fileInput: any) {
        fileInput.click();
    }
}
