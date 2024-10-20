import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-update-revai',
  templateUrl: './update-revai.component.html',
  styleUrls: ['./update-revai.component.scss']
})
export class UpdateRevaiComponent {
  @Input() title: string = "Thêm tài khoản REV-AI: ";
}
