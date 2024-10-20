import { Component } from '@angular/core';

@Component({
  selector: 'app-rev-ai',
  templateUrl: './rev-ai.component.html',
  styleUrls: ['./rev-ai.component.scss']
})
export class RevAiComponent {
  title: string = "Quản lý tài khoản REV-AI";
  currentPage: string = "REV-AI";

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
