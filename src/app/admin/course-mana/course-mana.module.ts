import {NgModule} from '@angular/core';

import {CourseManaRoutingModule} from './course-mana-routing.module';
import {CourseManaComponent} from './course-mana.component';
import {ShareAdminModule} from '../share-admin/share-admin.module';


@NgModule({
  declarations: [
    CourseManaComponent
  ],
  imports: [
    ShareAdminModule,
    CourseManaRoutingModule
  ]
})
export class CourseManaModule { }
