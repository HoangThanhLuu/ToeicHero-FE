import { Component } from '@angular/core';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent {
  title: string = "Quản lý đề thi";
  currentPage: string = "Đề thi";
}
