import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {AuthService} from '../../../auth.service';
import {finalize} from 'rxjs';

@Component({
  selector: 'app-change-password-admin',
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
      this.toast.error('New password and confirm password do not match');
      return false;
    }

    const passwords = [
      { key: 'Current password', value: currentPassword },
      { key: 'New password', value: newPassword },
      { key: 'Confirm password', value: confirmPassword }
    ];

    for (const { key, value } of passwords) {
      if (value.length < 8) {
        this.toast.error(`${key} must be at least 8 characters`);
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
            this.toast.success('Change password successfully');
            this.auth.logout();
            window.location.href = '/login';
          } else {
            this.toast.error(res?.message);
          }
        });
    }
  }
}
