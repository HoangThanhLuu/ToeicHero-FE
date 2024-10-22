import { Component } from '@angular/core';

@Component({
  selector: 'app-tiny',
  templateUrl: './tiny.component.html',
  styleUrls: ['./tiny.component.scss']
})
export class TinyComponent {
  title: string = "Quản lý tài khoản Tiny";
  currentPage: string = "Tiny";

}
