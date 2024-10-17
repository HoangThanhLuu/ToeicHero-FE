import {Component, Input} from '@angular/core';
import {AdminLibBaseCss3, AdminStyle2} from "../../admin.style";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-add-topic',
  templateUrl: './add-topic.component.html',
  styleUrls: ['./add-topic.component.scss',
    ...AdminLibBaseCss3,
    ...AdminStyle2
  ]
})
export class AddTopicComponent {
  @Input() title: string = "";

  constructor(private http: HttpClient) {
  }


}
