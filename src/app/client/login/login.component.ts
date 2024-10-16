import {Component, EventEmitter, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";


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

  constructor(private http: HttpClient) {
  }

  @Output() close = new EventEmitter();
  @Output() signIn = new EventEmitter();
  @Output() signUp = new EventEmitter();

  isRegisterTab = false;

  switchTab() {
    this.isRegisterTab = !this.isRegisterTab;
  }

  loginSubmit() {
    this.http.get("/api/test")
      .subscribe((data) => {
        console.log(data);
      });
  }
}


