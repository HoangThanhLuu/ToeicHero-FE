import {Component, Input} from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent {

  @Input() title: string = "";
  @Input() currentPage: string = "";
}
