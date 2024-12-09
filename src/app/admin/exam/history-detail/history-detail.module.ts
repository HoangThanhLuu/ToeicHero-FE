import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HistoryDetailRoutingModule} from './history-detail-routing.module';
import {HistoryDetailComponent} from './history-detail.component';
import {HistoryExamModule} from '../../../client/history-exam/history-exam.module';
import {NzCardComponent, NzCardModule} from 'ng-zorro-antd/card';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzProgressComponent, NzProgressModule} from 'ng-zorro-antd/progress';
import {NzTableComponent, NzTableModule} from 'ng-zorro-antd/table';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {NzListModule} from 'ng-zorro-antd/list';
import {NzTypographyModule} from 'ng-zorro-antd/typography';


@NgModule({
  declarations: [
    HistoryDetailComponent
  ],
  imports: [
    CommonModule,
    HistoryDetailRoutingModule,
    HistoryExamModule,
    NzIconDirective,
    NzTableComponent,
    NzTagComponent,
    NzTableModule,
    NzListModule,
    NzTypographyModule,
    NzCardModule,
    NzProgressModule
  ]
})
export class HistoryDetailModule {
}
