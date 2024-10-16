import {Component, Input} from '@angular/core';
import {AdminLibBaseCss3, AdminStyle2} from "../../admin.style";

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css',
    ...AdminLibBaseCss3,
    ...AdminStyle2,
  ]
})
export class AddExamComponent {
  @Input() title: string = "Add Exam";
}
