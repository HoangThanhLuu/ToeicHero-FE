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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamRoutingModule {
}
