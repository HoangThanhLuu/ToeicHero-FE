import { Component } from '@angular/core';

@Component({
  selector: 'app-template-email',
  templateUrl: './template-email.component.html',
  styleUrls: ['./template-email.component.scss']
})
export class TemplateEmailComponent {
  title: string = "Quản lý Template Email";
  currentPage: string = "Template Email";

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
