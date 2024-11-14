import { NgModule } from '@angular/core';

import { HistoryExamRoutingModule } from './history-exam-routing.module';
import {ShareClientModule} from '../share-client/share-client.module';
import {HistoryExamComponent} from './history-exam.component';
import {HistoryExamDetailComponent} from './history-exam-detail/history-exam-detail.component';


@NgModule({
  declarations: [
    HistoryExamComponent,
    HistoryExamDetailComponent
  ],
  imports: [
    ShareClientModule,
    HistoryExamRoutingModule
  ]
})
export class HistoryExamModule { }
