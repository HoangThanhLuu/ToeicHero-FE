import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestsRoutingModule } from './tests-routing.module';
import { TestsComponent } from './tests.component';
import {NzTagComponent} from 'ng-zorro-antd/tag';


@NgModule({
  declarations: [
    TestsComponent
  ],
    imports: [
        CommonModule,
        TestsRoutingModule,
        NzTagComponent
    ]
})
export class TestsModule { }
