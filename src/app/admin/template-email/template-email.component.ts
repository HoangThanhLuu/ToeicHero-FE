import { Component } from '@angular/core';

@Component({
  selector: 'app-template-email',
  templateUrl: './template-email.component.html',
  styleUrls: ['./template-email.component.scss']
})
export class TemplateEmailComponent {
  title: string = "Quản lý mẫu Email";
  currentPage: string = "Email-Config";
}
