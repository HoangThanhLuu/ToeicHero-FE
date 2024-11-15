import {Component} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {BsModalService} from 'ngx-bootstrap/modal';
import {NgxSpinnerService} from 'ngx-spinner';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {UpdateProfileComponent} from './update-profile/update-profile.component';
import {ProfileService} from '../../common/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  avatarSrc: string = '';
  formData = new FormData();
  showDropdown = false;

  constructor(private toast: ToastrService,
              private http: HttpClient,
              private modal: NzModalService,
              private bsModalService: BsModalService,
              private spinner: NgxSpinnerService,
              public profileService: ProfileService) {
  }

  openFormEditInfo() {
    const bsModalRef = this.bsModalService.show(UpdateProfileComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        isPopup: true
      }
    });
    if (bsModalRef?.content) {
      bsModalRef.content.close.subscribe(() => {
        this.profileService.getProfileData();
      })
    }
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
            this.http.post<any>('/api/user/update-avatar', this.formData)
              .subscribe(_ => {
                this.spinner.hide().then(r => r);
                this.toast.success('Cập nhật ảnh đại diện thành công');
                this.profileService.getProfileData();
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

  logout() {
    localStorage.removeItem('token');
    localStorage.setItem('tokenValid', 'false');
    localStorage.removeItem('profile');
    window.location.href = '/home';
  }
}
