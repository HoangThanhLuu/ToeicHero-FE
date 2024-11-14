import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {NgxSpinnerService} from "ngx-spinner";
import {ActivatedRoute} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  params: any = {
    newPassword: '',
    confirmPassword: '',
    otp: ''
  };
  showBorderError: any = [];

  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private spinnerService: NgxSpinnerService,
    private translate: TranslateService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.params.otp = params['otp'];
    });
  }

  resetPassword() {
    if(this.validateParam()){
      this.spinnerService.show();
      this.http.post(`api/user/reset-password`, {
        otp: this.params.otp,
        password: this.params.newPassword
      })
        .subscribe({
          next: (res: any) => {
            const msg = this.translate.instant(`USER.${res?.message}`);
            if (res.success) {
              this.toastr.success(msg);
              window.location.href = '/login';
            } else {
              this.toastr.error(msg);
            }
            this.spinnerService.hide();
          },
          error: (res: any) => {
            const msg = this.translate.instant(`USER.${res?.message}`);
            this.toastr.error(msg);
            this.spinnerService.hide();
          }
        });
    }
  }

  validateParam() {
    if (!this.params.newPassword) {
      this.toastr.error('Vui lòng nhập password');
      this.showBorderError[0] = true;
      return;
    } else {
      this.showBorderError[0] = false;
    }
    if (this.params.newPassword !== this.params.confirmPassword) {
      this.toastr.error('Mật khẩu mới và mật khẩu xác nhận không trùng khớp');
      return false;
    }
    if (this.params.newPassword.length < 8) {
      this.toastr.error('Mật khẩu mới phải có độ dài lớn hơn hoặc bằng 8 ký tự');
      return false;
    }
    return true;
  }
}
