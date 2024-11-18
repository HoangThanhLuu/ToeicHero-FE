import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseDetailRoutingModule } from './course-detail-routing.module';
import { CourseDetailComponent } from './course-detail.component';
import {ShareClientModule} from '../../share-client/share-client.module';
import {NzModalModule} from 'ng-zorro-antd/modal';


@NgModule({
  declarations: [
    CourseDetailComponent
  ],
  imports: [
    CommonModule,
    CourseDetailRoutingModule,
    ShareClientModule,
    NzModalModule
  ]
})
export class CourseDetailModule { }
