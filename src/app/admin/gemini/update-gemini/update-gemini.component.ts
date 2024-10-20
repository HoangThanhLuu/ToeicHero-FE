import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-update-gemini',
  templateUrl: './update-gemini.component.html',
  styleUrls: ['./update-gemini.component.scss']
})
export class UpdateGeminiComponent {
  @Input() title: string = "Thêm tài khoản Gemini: ";
}
