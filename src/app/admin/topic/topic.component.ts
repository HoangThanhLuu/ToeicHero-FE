import { Component } from '@angular/core';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent {
  title: string = "Quản lý bộ đề thi";
  currentPage: string = "Bộ đề thi";
}
