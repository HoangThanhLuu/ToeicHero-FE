import {NgModule} from '@angular/core';

import {CourseCategoryRoutingModule} from './course-category-routing.module';
import {CourseCategoryComponent} from './course-category.component';
import {ShareAdminModule} from '../../share-admin/share-admin.module';


@NgModule({
  declarations: [
    CourseCategoryComponent
  ],
  imports: [
    ShareAdminModule,
    CourseCategoryRoutingModule
  ]
})
export class CourseCategoryModule { }
