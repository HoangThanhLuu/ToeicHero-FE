import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  password: HTMLInputElement | null = null;
  confirmPassword: HTMLInputElement | null = null;

  constructor() {
  }

  ngOnInit(): void {
    this.password = document.getElementById("password") as HTMLInputElement;
    this.confirmPassword = document.getElementById("confirmPassword") as HTMLInputElement;
  }

  validatePassword(): boolean {
    if (this.password && this.confirmPassword && this.password.value !== this.confirmPassword.value) {
      this.confirmPassword.setCustomValidity("Mật khẩu mới không trùng khớp. Vui lòng nhập lại");
      return false;
    } else {
      if (this.confirmPassword) {
        this.confirmPassword.setCustomValidity('');
      }
      return true;
    }
  }
}
