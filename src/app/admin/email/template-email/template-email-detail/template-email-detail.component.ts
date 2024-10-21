import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'app-template-email-detail',
  templateUrl: './template-email-detail.component.html',
  styleUrls: ['./template-email-detail.component.scss']
})
export class TemplateEmailDetailComponent {
  @Input() templateContent: string = '';
}
