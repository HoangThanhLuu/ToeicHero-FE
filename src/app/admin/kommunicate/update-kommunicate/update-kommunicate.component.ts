import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-update-kommunicate',
  templateUrl: './update-kommunicate.component.html',
  styleUrls: ['./update-kommunicate.component.scss']
})
export class UpdateKommunicateComponent {
  @Input() title: string = "Thêm tài khoản Kommunicate: ";
}
