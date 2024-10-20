import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.component.html',
  styleUrls: ['./update-email.component.scss']
})
export class UpdateEmailComponent {

  @Input() title: string = "Thêm Email: ";
}
