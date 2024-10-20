import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-update-template-email',
  templateUrl: './update-template-email.component.html',
  styleUrls: ['./update-template-email.component.scss']
})
export class UpdateTemplateEmailComponent {
  @Input() title: string = "Thêm Tempalte-email: ";
}
