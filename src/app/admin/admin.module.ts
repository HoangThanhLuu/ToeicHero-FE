import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {AdminComponent} from './admin.component';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './navbar/navbar.component';

import {AdminRoutingModule} from "./admin-routing.module";
import {FooterAdminComponent} from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ExamComponent } from './exam/exam.component';
import { TopicComponent } from './topic/topic.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { AddTopicComponent } from './topic/add-topic/add-topic.component';
import { UsersComponent } from './users/users.component'
import {NzUploadModule} from "ng-zorro-antd/upload";
import {NzIconModule} from "ng-zorro-antd/icon";
import {FormsModule} from "@angular/forms";
import {NgxSpinnerModule} from "ngx-spinner";
import { AddExamComponent } from './exam/add-exam/add-exam.component';
import { AudioPlayerComponent } from './exam/audio-player/audio-player.component';
import { EditExamComponent } from './exam/edit-exam/edit-exam.component';
import { ExamDetailComponent } from './exam/exam-detail/exam-detail.component';
import {NzButtonModule} from "ng-zorro-antd/button";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import { QuestionComponent } from './exam/question/question.component';
import { EditQuestionPart1Component } from './exam/edit-question-part1/edit-question-part1.component';
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzImageModule} from "ng-zorro-antd/image";
import { EditQuestionPart34Component } from './exam/edit-question-part34/edit-question-part34.component';
import { EditPartComponent } from './exam/edit-part/edit-part.component';

@NgModule({
    declarations: [
        AdminComponent,
        HomeComponent,
        NavbarComponent,
        FooterAdminComponent,
        SidebarComponent,
        ExamComponent,
        TopicComponent,
        PageHeaderComponent,
        AddTopicComponent,
        UsersComponent,
        AddExamComponent,
        AudioPlayerComponent,
        EditExamComponent,
        ExamDetailComponent,
        QuestionComponent,
        EditQuestionPart1Component,
        EditQuestionPart34Component,
        EditPartComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        NzUploadModule,
        NzIconModule,
        NgOptimizedImage,
        FormsModule,
        NgxSpinnerModule,
        NzButtonModule,
        TooltipModule,
        NzAvatarModule,
        NzImageModule,
    ],
    exports: [
        PageHeaderComponent
    ]
})
export class AdminModule {
}
