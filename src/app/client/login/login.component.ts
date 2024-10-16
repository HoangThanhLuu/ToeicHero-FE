import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {matchpassword} from "./matchpassword.validator";
import {BsModalService} from "ngx-bootstrap/modal";
import {OtpConfirmComponent} from "./otp-confirm/otp-confirm.component";
import {ConfirmModalComponent} from "../../common/confirm-modal/confirm-modal.component";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent {

  @Output() close = new EventEmitter();
  @Output() signIn = new EventEmitter();
  @Output() signUp = new EventEmitter();

  isRegisterTab = false;

  switchTab() {
    this.isRegisterTab = !this.isRegisterTab;
  }

  public registerForm: FormGroup
  loginForm = {
    email: '',
    password: ''
  };


  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private bs: BsModalService) {
    this.registerForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email, Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}")]],
        fullName: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: matchpassword
      });

  }

  register() {

    this.http.post('/api/user/register', this.registerForm.value)
      .subscribe((res: any) => {
        if (res?.success) {
           this.sendEmail(this.registerForm.value?.email);
        } else {
          alert(res?.message);
        }
      });
  }

  sendEmail(email: any){
    this.http.post('/api/user/send-email', {to:email})
      .subscribe((res: any) => {
      if(res.success == true){
        this.bs.show(OtpConfirmComponent, {class: 'modal-lg modal-dialog-centered'});

      } else {
        alert("Gửi mã OTP tới email thất bại")
      }
      })
  }

  login() {


    if (this.isNotValidInputLogin()) {
      alert('Email hoặc tên đăng nhập không được bỏ trống');
      return;
    }
    this.http.post("/api/user/authenticate", this.loginForm)
      .subscribe((res: any) => {
        if(res?.success == true) {
          alert(res?.message);
          window.localStorage.setItem("token", res?.data);
          window.location.href = '/test';
        }else{
          alert(res?.message);
        }
      });
  }

  private isNotValidInputLogin(): boolean {
    return this.loginForm?.email === '' || this.loginForm.password === '';
  }


}


