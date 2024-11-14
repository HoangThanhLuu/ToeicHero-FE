import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlogComponent} from './blog.component';
import {DetailBlogComponent} from './detail-blog/detail-blog.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent
  },
  {
    path: 'detail-blog/:blogId',
    component: DetailBlogComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {
}
