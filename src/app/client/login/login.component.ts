import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {matchpassword} from "./matchpassword.validator";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {OtpConfirmComponent} from "./otp-confirm/otp-confirm.component";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {NzModalService} from "ng-zorro-antd/modal";
import {
  FacebookLoginProvider,
  SocialAuthService,
  SocialUser
} from "@abacritt/angularx-social-login";
import {finalize} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  @Output() close = new EventEmitter();
  @Output() signIn = new EventEmitter();
  @Output() signUp = new EventEmitter();
  @Input() isNotDirect: boolean = false;
  isRegisterTab = false;
  message: string = '';
  showBorderError: any = [];
  user!: SocialUser;
  registerForm: FormGroup;
  loginForm = {
    email: '',
    password: ''
  };


  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private bs: BsModalService,
              private modal: NzModalService,
              private bsModalRef: BsModalRef,
              private spinnerService: NgxSpinnerService,
              private socialAuthService: SocialAuthService,
              private toast: ToastrService) {
    this.registerForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email, Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}")]],
        fullName: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: matchpassword
      });

  }

  ngOnInit(): void {
    this.spinnerService.show().then(r => r);
    this.http.get('/api/user/is-login')
      .pipe(finalize(() => this.spinnerService.hide()))
      .subscribe((res: any) => {
        if (res?.success && res?.data) {
          this.bsModalRef.hide();
          window.location.href = '/home';
        } else {
          this.socialAuthService.authState
            .subscribe((res) => {
              this.user = res;
              if (res) {
                if (res.provider == 'GOOGLE') {
                  const params = {
                    email: res?.email,
                    fullName: res?.name,
                    avatar: res?.photoUrl,
                    provider: res?.provider,
                  };
                  this.loginWithSocial(params);
                }
              }
            });
        }
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
    this.spinnerService.show();
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
        } else {
          this.toast.error(res?.message);
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
    if (modalRef && modalRef.content) {
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
          this.toast.success('Tài khoản của bạn chưa được kích hoạt. Vui lòng kiểm tra email để kích hoạt tài khoản');
        } else {
          this.toast.error(res?.message);
        }
      });
  }

  login() {
    if (this.isNotValidInputLogin()) {
      this.toast.error('Email hoặc mật khẩu không được bỏ trống');
      return;
    }
    this.spinnerService.show();
    this.http.post("/api/user/authenticate", this.loginForm)
      .pipe(finalize(() => this.spinnerService.hide()))
      .subscribe((res: any) => {
        this.spinnerService.hide();
        if (!res?.success) {
          this.toast.error(res?.message);
          if (res?.data == 'INACTIVE') {
            this.sendEmail(this.loginForm.email);
            this.showConfirmOTP(this.loginForm.email, false);
          }
        } else {
          this.toast.success('Đăng nhập thành công');
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


  loginWithFB() {
    this.socialAuthService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((data: any) => {
        const params = {
          email: data?.email,
          fullName: data?.name,
          avatar: data?.photoUrl,
          provider: data?.provider,
        };
        this.loginWithSocial(params);
      });
  }

  loginWithSocial(params: any) {
    this.spinnerService.show().then(r => r);
    this.http.post('/api/user/login-social', params)
      .pipe(finalize(() => this.spinnerService.hide()))
      .subscribe((res: any) => {
        if (res?.success) {
          this.toast.success('Đăng nhập thành công');
          localStorage.setItem('token', res?.data);
          localStorage.setItem('tokenValid', 'true');
          if (!this.isNotDirect) {
            window.location.href = '/home';
          } else {
            this.signIn.emit();
            this.bsModalRef.hide();
            window.location.reload();
          }
        } else {
          this.toast.error(res?.message);
        }
      });
  }

  ngOnDestroy(): void {

  }
}


