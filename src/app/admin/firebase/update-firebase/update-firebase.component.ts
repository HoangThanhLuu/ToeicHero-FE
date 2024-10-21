import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-update-firebase',
  templateUrl: './update-firebase.component.html',
  styleUrls: ['./update-firebase.component.scss']
})
export class UpdateFirebaseComponent {
  @Input() title: string = "Thêm Firebase: ";
  @Input() isAdd = true;
}
