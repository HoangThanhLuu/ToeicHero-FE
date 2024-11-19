import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRegisterRoutingModule } from './course-register-routing.module';
import { CourseRegisterComponent } from './course-register.component';
import {PageHeaderComponent} from '../../page-header/page-header.component';
import {
  NzTableCellDirective,
  NzTableComponent,
  NzTbodyComponent,
  NzTheadComponent,
  NzThMeasureDirective, NzTrDirective
} from 'ng-zorro-antd/table';
import {NzPaginationComponent} from 'ng-zorro-antd/pagination';


@NgModule({
  declarations: [
    CourseRegisterComponent
  ],
    imports: [
        CommonModule,
        CourseRegisterRoutingModule,
        PageHeaderComponent,
        NzTableCellDirective,
        NzTableComponent,
        NzTbodyComponent,
        NzThMeasureDirective,
        NzTheadComponent,
        NzTrDirective,
        NzPaginationComponent
    ]
})
export class CourseRegisterModule { }
