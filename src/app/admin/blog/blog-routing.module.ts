import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlogComponent} from './blog.component';
import {AddBlogComponent} from './add-blog/add-blog.component';
import {tinyResolver} from '../../common/tiny-service.service';

const routes: Routes = [
  {
    path: 'get',
    component: BlogComponent
  },
  {
    path: 'add',
    resolve: [tinyResolver],
    component: AddBlogComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {
}
