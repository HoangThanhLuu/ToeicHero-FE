import {Component, EventEmitter, Output} from '@angular/core';



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
}


