import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CourseQrRoutingModule} from './course-qr-routing.module';
import {CourseQrComponent} from './course-qr.component';
import {NzBadgeComponent} from 'ng-zorro-antd/badge';
import {FormsModule} from '@angular/forms';
import {ShareAdminModule} from '../../share-admin/share-admin.module';


@NgModule({
  declarations: [
    CourseQrComponent
  ],
    imports: [
        CommonModule,
        CourseQrRoutingModule,
        NzBadgeComponent,
        FormsModule,
        ShareAdminModule
    ]
})
export class CourseQrModule { }
