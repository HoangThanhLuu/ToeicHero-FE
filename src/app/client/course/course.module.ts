import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {CourseRoutingModule} from './course-routing.module';
import {CourseComponent} from './course.component';
import {NzImageDirective, NzImageModule} from 'ng-zorro-antd/image';
import {NzPaginationComponent} from 'ng-zorro-antd/pagination';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {NzBadgeModule} from 'ng-zorro-antd/badge';


@NgModule({
  declarations: [
    CourseComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    NzImageDirective,
    NzPaginationComponent,
    NgOptimizedImage,
    NzTagComponent,
    NzBadgeModule,
    NzImageModule
  ]
})
export class CourseModule {
}
