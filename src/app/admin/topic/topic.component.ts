import { Component } from '@angular/core';
import {AdminLibBaseCss2, AdminStyle} from "../admin.style";
import {BsModalService} from "ngx-bootstrap/modal";
import {AddTopicComponent} from "./add-topic/add-topic.component";

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css',
    ...AdminLibBaseCss2,
    ...AdminStyle
  ]
})
export class TopicComponent {
  title: string = "Quản lý bộ đề thi";
  currentPage: string = "Bộ đề thi";
  constructor(private bsModalService: BsModalService) {
  }

  addTopic() {
    this.bsModalService.show(AddTopicComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Thêm bộ đề thi'
      }
    });
  }

}
