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
import {GoogleAuthService} from "./google-auth.service";


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
  clientId: string = '979931356007-03ed2esa3j6gl56rom12robrgln5iop3.apps.googleusercontent.com';
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
              private googleAuthService: GoogleAuthService,
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
    this.http.get('/api/user/is-login')
      .subscribe((res: any) => {
        if (res?.success && res?.data) {
          this.bsModalRef.hide();
          window.location.href = '/home';
        } else {
          this.socialAuthService.authState
            .subscribe((user) => {
              this.user = user;
              if (user) {
                console.log('User logged in:', user);
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
    this.http.post('/api/user/register', this.registerForm.value)
      .subscribe((res: any) => {
        if (res?.success) {
          this.sendEmail(this.registerForm.value?.email);
        } else {
          this.toast.error(res?.message);
        }
      });
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

  sendEmail(email: any, switchTab = true) {
    this.http.post('/api/user/send-email', {to: email})
      .subscribe((res: any) => {
        this.spinnerService.hide();
        if (res.success == true) {
          const modalRef = this.bs.show(OtpConfirmComponent,
            {
              class: 'modal-lg modal-dialog-centered',
              ignoreBackdropClick: true,
              initialState: {
                otpCode: res?.data,
                email: email
              }
            });
          if (modalRef && modalRef.content) {
            modalRef.content.confirmed.subscribe(() => {
              if (switchTab)
                this.switchTab();
            });
          }
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
      .subscribe((res: any) => {
        if (!res?.success) {
          this.toast.error(res?.message);
          if (res?.data == 'INACTIVE') {
            this.sendEmail(this.loginForm.email, false);
          } else {
            this.spinnerService.hide();
          }
        } else {
          this.spinnerService.hide();
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
        console.log(data);
      });
  }

  loginWithGoogle() {
    this.googleAuthService.authenticateUser(this.clientId);
  }

  ngOnDestroy(): void {

  }
}


