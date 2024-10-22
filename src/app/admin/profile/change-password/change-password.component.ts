import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {NzModalService} from "ng-zorro-antd/modal";
import {ToastrService} from "ngx-toastr";
import {BsModalService} from "ngx-bootstrap/modal";
import {NgxSpinnerService} from "ngx-spinner";
import {AuthService} from "../../../auth.service";
import {GetHeaderService} from "../../../common/get-headers/get-header.service";
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
              private modal: NzModalService,
              private toast: ToastrService,
              private bsModalService: BsModalService,
              private spinner: NgxSpinnerService,
              private auth: AuthService,
              private getHeaderService: GetHeaderService) {

    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  validateParam() {
    const {currentPassword, newPassword, confirmPassword} = this.param;
    if (newPassword !== confirmPassword) {
      this.toast.error('Mật khẩu mới và mật khẩu xác nhận không trùng khớp');
      return false;
    }
    // check new password and confirm password length >= 8
    if (currentPassword.length < 8) {
      this.toast.error('Mật khẩu hiện tại phải có độ dài lớn hơn hoặc bằng 8 ký tự');
      return false;
    }

    if (newPassword.length < 8) {
      this.toast.error('Mật khẩu mới phải có độ dài lớn hơn hoặc bằng 8 ký tự');
      return false;
    }

    if (confirmPassword.length < 8) {
      this.toast.error('Mật khẩu xác nhận phải có độ dài lớn hơn hoặc bằng 8 ký tự');
      return false;
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
