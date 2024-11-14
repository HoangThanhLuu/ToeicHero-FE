import {NgModule} from '@angular/core';

import {BlogRoutingModule} from './blog-routing.module';
import {ShareAdminModule} from '../share-admin/share-admin.module';
import {BlogComponent} from './blog.component';
import {AddBlogComponent} from './add-blog/add-blog.component';
import {EditorComponent} from '@tinymce/tinymce-angular';
import {PopoverModule} from 'ngx-bootstrap/popover';


@NgModule({
  declarations: [
    BlogComponent,
    AddBlogComponent
  ],
  imports: [
    ShareAdminModule,
    BlogRoutingModule,
    EditorComponent,
    PopoverModule
  ]
})
export class BlogModule {
}
