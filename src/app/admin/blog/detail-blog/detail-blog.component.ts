import {Component, Input, NgModule } from '@angular/core';
import {SafeHtmlPipe} from "../../../common/pipe/safe-html.pipe";

@Component({
  selector: 'app-detail-blog',
  templateUrl: './detail-blog.component.html',
  styleUrls: ['./detail-blog.component.scss'],
  imports: [
    SafeHtmlPipe
  ],
  standalone: true
})
export class DetailBlogComponent {
  @Input() content: string = '';
}
@NgModule({})
export class DetailBlogModule {}
