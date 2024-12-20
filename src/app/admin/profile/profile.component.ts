import {Component} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {BsModalService} from "ngx-bootstrap/modal";
import {NgxSpinnerService} from "ngx-spinner";
import {catchError, finalize, switchMap, tap} from "rxjs/operators";
import {of} from "rxjs";
import {UpdateProfileComponent} from "./update-profile/update-profile.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {ProfileService} from '../../common/profile.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  currentUser: any;
  avatarSrc: string = '';
  formData = new FormData();
  showDropdown = false;

  constructor(private toast: ToastrService,
              private http: HttpClient,
              private modal: NzModalService,
              private bsModalService: BsModalService,
              private spinner: NgxSpinnerService,
              protected profileService: ProfileService) {
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
      nzTitle: `Confirm`,
      nzContent: `Do you want to be update your profile picture?`,
      nzCentered: true,
      nzFooter: [
        {
          label: 'Cancel',
          onClick: () => confirmModal.destroy()
        }, {
          label: 'Agree',
          type: 'primary',
          onClick: () => {
            this.spinner.show().then(r => r);
            this.http.post<any>('/api/upload-file', this.formData).pipe(
              switchMap((res: any) => {
                if (res?.success) {
                  return this.http.post<any>('/api/user/update-avatar', {avatar: res?.data});
                } else {
                  return of(res);
                }
              }),
              tap((res1: any) => {
                if (res1?.success) {
                  this.toast.success(res1?.message);
                  const profile = localStorage.getItem('profile') ?? '';
                  const currentProfile = JSON.parse(profile);
                  currentProfile.avatar = res1?.data;
                  localStorage.setItem('profile', JSON.stringify(currentProfile));
                } else {
                  this.toast.error(res1?.message);
                }
              }),
              catchError((error: any) => {
                this.toast.error(error?.message || 'Update avatar fail');
                return of(error);
              }),
              finalize(() => this.spinner.hide())
            ).subscribe(() => {
              confirmModal.destroy();
            });
          }
        }
      ]
    });


  }

  triggerFileInput(fileInput: any) {
    fileInput.click();
  }

  openFormEditInfo() {
    const bsModalRef = this.bsModalService.show(UpdateProfileComponent, {
      class: 'modal-lg modal-dialog-centered',
    });
    if (bsModalRef.content) {
      bsModalRef.content.close.subscribe(() => {
        this.profileService.getProfileData().subscribe();
      })
    }
  }

  openFormChangePassword() {
    this.bsModalService.show(ChangePasswordComponent, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.setItem('tokenValid', 'false');
    localStorage.removeItem('profile');
    window.location.href = '/home';
  }
}
