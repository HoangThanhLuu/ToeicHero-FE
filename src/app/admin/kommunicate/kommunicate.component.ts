import { Component } from '@angular/core';

@Component({
  selector: 'app-kommunicate',
  templateUrl: './kommunicate.component.html',
  styleUrls: ['./kommunicate.component.scss']
})
export class KommunicateComponent {
  title: string = "Quản lý tài khoản Kommunicate";
  currentPage: string = "Kommunicate";

  dataSet = [
    {
      name: 'OTP',
      context: 'Chào mừng bạn đến với TOICUTE',
      action: 'active'
    },
    {
      name: 'Quên mật khẩu',
      context: 'Chào mừng bạn đến với TOICUTE',
      action: 'active'
    },
    {
      name: 'Thông báo',
      context: 'Chào mừng bạn đến với TOICUTE',
      action: 'active'
    }
  ];
}
