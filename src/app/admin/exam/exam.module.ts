import { NgModule } from '@angular/core';

import { ExamRoutingModule } from './exam-routing.module';
import {ShareAdminModule} from '../share-admin/share-admin.module';
import {ExamComponent} from './exam.component';
import {ExamDetailComponent} from './exam-detail/exam-detail.component';
import {EditQuestionPart1Component} from './edit-question-part1/edit-question-part1.component';
import {EditQuestionPart34Component} from './edit-question-part34/edit-question-part34.component';
import {EditPartComponent} from './edit-part/edit-part.component';
import {AddExamComponent} from './add-exam/add-exam.component';
import {EditExamComponent} from './edit-exam/edit-exam.component';
import {QuestionComponent} from './question/question.component';
import {NzDatePickerComponent} from 'ng-zorro-antd/date-picker';


@NgModule({
  declarations: [
    ExamComponent,
    ExamDetailComponent,
    EditQuestionPart1Component,
    EditQuestionPart34Component,
    EditPartComponent,
    EditExamComponent,
    AddExamComponent,
    QuestionComponent
  ],
    imports: [
        ShareAdminModule,
        ExamRoutingModule,
        NzDatePickerComponent
    ]
})
export class ExamModule { }
