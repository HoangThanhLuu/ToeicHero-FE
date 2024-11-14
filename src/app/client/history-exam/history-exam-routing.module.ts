import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HistoryExamComponent} from './history-exam.component';
import {HistoryExamDetailComponent} from './history-exam-detail/history-exam-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HistoryExamComponent
  },
  {
    path: 'detail/:userExamHistoryId',
    component: HistoryExamDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryExamRoutingModule { }
