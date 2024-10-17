import {Component, EventEmitter, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {matchpassword} from "./matchpassword.validator";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent {

  /*
  * Ví dụ cái đường dẫn endpoint là: http://localhost:8080/api/user/login
  * Thì m chỉ cần gọi đến bằng cách: http.post('/user/login') thôi
  *
  *
  * */
  @Output() close = new EventEmitter();
  @Output() signIn = new EventEmitter();
  @Output() signUp = new EventEmitter();

  isRegisterTab = false;

  switchTab() {
    this.isRegisterTab = !this.isRegisterTab;
  }

  public registerForm : FormGroup
  private user: any;


  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private router: Router) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email,Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}")]],

      fullName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    },
      {
        validators:matchpassword
      });
  }


  ngOnInit(): void {  }



  register() {
    console.log(this.registerForm.value)

    this.http.post('/api/user/register', this.registerForm.value)
      .subscribe((res: any) => {
        if (res?.success) {
          localStorage.setItem('currentUser', JSON.stringify(this.user));
          // alert('Đăng ký thành công');
          // this.registerForm.reset();
          // this.switchTab();
        } else {
          alert('Đăng ký thất bại');
        }
      });


    console.log('Dữ liệu nhập vào form:', this.registerForm.value);


  }


}


