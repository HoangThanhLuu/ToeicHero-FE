import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {matchpassword} from './matchpassword.validator';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {OtpConfirmComponent} from './otp-confirm/otp-confirm.component';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {finalize} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {ProfileService} from '../../common/profile.service';
import {BASE_URL, BASE_URL_LOCAL, CONSTANT,} from '../../common/constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Output() close = new EventEmitter();
  @Output() signIn = new EventEmitter();
  @Output() signUp = new EventEmitter();
  @Input() isNotDirect: boolean = false;
  @Input() directLink: string = '';
  isRegisterTab = false;
  message: string = '';
  showBorderError: any = [];
  registerForm: FormGroup;
  loginForm = {
    email: '',
    password: '',
    captcha: ''
  };
  captchaImg: any;


  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private bs: BsModalService,
              private profileService: ProfileService,
              private bsModalRef: BsModalRef,
              private spinnerService: NgxSpinnerService,
              private translate: TranslateService,
              private toast: ToastrService) {
    this.registerForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]],
        fullName: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: matchpassword
      });

  }

  ngOnInit(): void {
    if (this.profileService.isLogin) {
      this.bsModalRef.hide();
      window.location.href = '/home';
    } else {
      this.getCaptcha();
    }
  }

  getCaptcha() {
    this.http.get(`/api/user/get-captcha?${Date.now()}`, {
      observe: 'response',
      responseType: 'blob',
      withCredentials: true
    })
      .subscribe((res: any) => {
        document.cookie = `${CONSTANT.captcha}=${res.headers.get('captcha')};max-age=300;path=/`;
        this.captchaImg = URL.createObjectURL(res.body);
      });
  }

  switchTab() {
    this.isRegisterTab = !this.isRegisterTab;
  }

  register() {
    const isValidFormRegister = this.checkNotValidFormRegister();
    if (isValidFormRegister) {
      this.toast.error(this.message);
      return;
    }
    this.spinnerService.show().then();
    const email = this.registerForm.get('email')?.value ?? '';
    this.http.post('/api/user/register', this.registerForm.value)
      .pipe(
        finalize(() => {
          this.spinnerService.hide().then()
        })
      )
      .subscribe((res: any) => {
        if (res?.success) {
          this.showConfirmOTP(email);
          this.registerForm.reset();
        } else {
          const msg = this.translate.instant(`USER.${res?.message}`);
          this.toast.error(msg);
        }
      });
  }

  showConfirmOTP(email: string, switchTab: boolean = true) {
    const modalRef = this.bs.show(OtpConfirmComponent,
      {
        class: 'modal-lg modal-dialog-centered',
        ignoreBackdropClick: true,
        initialState: {
          email: email
        }
      });
    if (modalRef?.content) {
      modalRef.content.confirmed.subscribe(() => {
        if (switchTab)
          this.switchTab();
      });
    }
  }

  checkNotValidFormRegister() {
    if (this.registerForm.get('email')?.errors?.['pattern']) {
      this.message = 'Email không hợp lệ';
      this.showBorderError[0] = true;
      return true;
    } else {
      this.showBorderError[0] = false;
    }
    if (this.registerForm.controls['email'].errors) {
      this.message = 'Email không hợp lệ';
      this.showBorderError[0] = true;
      return true;
    } else {
      this.showBorderError[0] = false;
    }
    if (this.registerForm.controls['fullName'].errors) {
      this.message = 'Tên không được bỏ trống';
      this.showBorderError[1] = true;
      return true;
    } else {
      this.showBorderError[1] = false;
    }
    if (this.registerForm.controls['password'].errors) {
      this.message = 'Mật khẩu phải có ít nhất 8 ký tự';
      this.showBorderError[2] = true;
      return true;
    } else {
      this.showBorderError[2] = false;
    }

    const password = this.registerForm.controls['password'].value;
    const confirmPassword = this.registerForm.controls['confirmPassword'].value;

    if (password !== confirmPassword) {
      this.message = 'Mật khẩu không khớp';
      this.showBorderError[3] = true;
      return true;
    } else {
      this.showBorderError[3] = false;
    }
    return false;
  }

  sendEmail(email: any) {
    this.http.post('/api/user/send-email', {
      to: email,
      templateCode: 'AUTHENTICATION_AFTER_REGISTER'
    })
      .subscribe((res: any) => {
        if (res.success) {
          const msg = this.translate.instant(`USER.${res?.message}`);
          if (res?.success) {
            this.toast.success(msg);
          } else {
            this.toast.error(msg);
          }
        } else {
          const msg = this.translate.instant(`USER.${res?.message}`);
          this.toast.error(msg);
        }
      });
  }

  login() {
    if (this.isNotValidInputLogin()) {
      this.toast.error('Email hoặc Mật khẩu không hợp lệ');
      return;
    }
    this.spinnerService.show().then();
    this.http.post("/api/user/authenticate", this.loginForm)
      .pipe(finalize(() => this.spinnerService.hide()))
      .subscribe((res: any) => {
        this.spinnerService.hide().then();
        if (!res?.success) {
          const msg = this.translate.instant(`USER.${res?.message}`);
          this.toast.error(msg);
          if (res?.data == 'INACTIVE') {
            this.sendEmail(this.loginForm.email);
            this.showConfirmOTP(this.loginForm.email, false);
          }
        } else {
          const msg = this.translate.instant(`${res?.message}`);
          if (res?.success) {
            this.toast.success(msg);
          } else {
            this.toast.error(msg);
          }
          const roles = res?.data?.roles;
          localStorage.setItem('token', res?.data?.token);
          localStorage.setItem('tokenValid', 'true');
          if (!this.isNotDirect) {
            if (roles?.includes('ADMIN')) {
              window.location.href = '/admin';
            } else {
              window.location.href = '/home';
            }
          } else {
            this.signIn.emit();
            this.bsModalRef.hide();
            window.location.reload();
          }
        }
      });
  }

  private isNotValidInputLogin(): boolean {
    return this.loginForm?.email === '' || this.loginForm.password === '';
  }

  loginSocial(p: string) {
    // set directLink to cookie with 5 minutes
    if (this.isNotDirect) {
      document.cookie = `directLink=${this.directLink};max-age=300;path=/`;
    }
    window.location.href = `${this.profileService.isDevelopmentMode ? BASE_URL_LOCAL : BASE_URL}/api/oauth2/authorize/${p}?redirect_uri=${window.location.origin}/oauth2/redirect`;
  }

  forgetPassword() {
    this.bs.show(ForgotPasswordComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        param: {
          email: this.loginForm.email
        }
      }
    });
  }

  protected readonly Provider = Provider;
}

export enum Provider {
  GOOGLE = 'google',
  FACEBOOK = 'facebook'
}


