import {Component, EventEmitter, Output} from '@angular/core';



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
}


