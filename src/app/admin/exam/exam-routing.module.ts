import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExamComponent} from './exam.component';
import {ExamDetailComponent} from './exam-detail/exam-detail.component';
import {AddExamComponent} from './add-exam/add-exam.component';
import {QuestionComponent} from './question/question.component';

const routes: Routes = [
  {
    path: 'list',
    component: ExamComponent
  },
  {
    path: 'detail',
    component: ExamDetailComponent
  },
  {
    path: 'add',
    component: AddExamComponent
  }, {
    path: 'question/list-by-part',
    component: QuestionComponent
  },
  {path: 'history', loadChildren: () => import('./history/history.module').then(m => m.HistoryModule)},
  {
    path: 'history-detail',
    loadChildren: () => import('./history-detail/history-detail.module').then(m => m.HistoryDetailModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamRoutingModule {
}
