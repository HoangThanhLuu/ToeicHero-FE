import {Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-template-email-detail',
  templateUrl: './template-email-detail.component.html',
  styleUrls: ['./template-email-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TemplateEmailDetailComponent {
  @Input() templateContent: string = '';
}
