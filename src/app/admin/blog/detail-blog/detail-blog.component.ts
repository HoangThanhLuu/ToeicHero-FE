import {Component, Input, NgModule } from '@angular/core';

@Component({
  selector: 'app-detail-blog',
  templateUrl: './detail-blog.component.html',
  styleUrls: ['./detail-blog.component.scss'],
  standalone: true
})
export class DetailBlogComponent {
  @Input() content: string = '';
}
@NgModule({})
export class DetailBlogModule {}
