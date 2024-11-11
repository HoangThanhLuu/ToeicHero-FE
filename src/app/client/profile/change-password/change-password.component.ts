import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgxSpinnerService} from "ngx-spinner";
import {AuthService} from "../../../auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {finalize} from "rxjs";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  changePasswordForm: FormGroup;
  param: any = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private toast: ToastrService,
              private spinner: NgxSpinnerService,
              private auth: AuthService) {

    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  validateParam() {
    const { currentPassword, newPassword, confirmPassword } = this.param;

    if (newPassword !== confirmPassword) {
      this.toast.error('Mật khẩu mới và mật khẩu xác nhận không trùng khớp');
      return false;
    }

    const passwords = [
      { key: 'Mật khẩu hiện tại', value: currentPassword },
      { key: 'Mật khẩu mới', value: newPassword },
      { key: 'Mật khẩu xác nhận', value: confirmPassword }
    ];

    for (const { key, value } of passwords) {
      if (value.length < 8) {
        this.toast.error(`${key} phải có độ dài lớn hơn hoặc bằng 8 ký tự`);
        return false;
      }
    }

    return true;
  }

  changePassword() {
    if (this.validateParam()) {
      this.spinner.show().then(r => r);
      this.http.patch('/api/user/update-password', this.param)
        .pipe(finalize(() => this.spinner.hide()))
        .subscribe((res: any) => {
          if (res?.success) {
            this.toast.success('Đổi mật khẩu thành công');
            this.auth.logout();
            window.location.href = '/login';
          } else {
            this.toast.error(res?.message);
          }
        });
    }
  }
}
