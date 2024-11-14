import {Component} from '@angular/core';
import {AdminStyle} from '../admin.style';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css',
    ...AdminStyle
  ]
})
export class HomeComponent {

}
