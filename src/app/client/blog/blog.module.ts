import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import {NzImageModule} from 'ng-zorro-antd/image';
import {NzPaginationModule} from 'ng-zorro-antd/pagination';
import {DetailBlogComponent} from './detail-blog/detail-blog.component';


@NgModule({
  declarations: [
    BlogComponent,
    DetailBlogComponent
  ],
    imports: [
        CommonModule,
        BlogRoutingModule,
        NzImageModule,
        NzPaginationModule
    ]
})
export class BlogModule { }
