import { Component } from '@angular/core';

@Component({
  selector: 'app-gemini',
  templateUrl: './gemini.component.html',
  styleUrls: ['./gemini.component.scss']
})
export class GeminiComponent {
  title: string = "Quản lý tài khoản Gemini";
  currentPage: string = "Gemini";

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
