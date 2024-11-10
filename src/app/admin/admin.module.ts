import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {AdminComponent} from './admin.component';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './navbar/navbar.component';

import {AdminRoutingModule} from './admin-routing.module';
import {FooterAdminComponent} from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ExamComponent } from './exam/exam.component';
import { TopicComponent } from './topic/topic.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { AddTopicComponent } from './topic/add-topic/add-topic.component';
import { UsersComponent } from './users/users.component'
import {NzUploadModule} from 'ng-zorro-antd/upload';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-spinner';
import { AddExamComponent } from './exam/add-exam/add-exam.component';
import { AudioPlayerComponent } from './exam/audio-player/audio-player.component';
import { EditExamComponent } from './exam/edit-exam/edit-exam.component';
import { ExamDetailComponent } from './exam/exam-detail/exam-detail.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import { QuestionComponent } from './exam/question/question.component';
import { EditQuestionPart1Component } from './exam/edit-question-part1/edit-question-part1.component';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzImageModule} from 'ng-zorro-antd/image';
import { EditQuestionPart34Component } from './exam/edit-question-part34/edit-question-part34.component';
import { EditPartComponent } from './exam/edit-part/edit-part.component';
import { ScoreComponent } from './score/score.component';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzPopconfirmModule} from 'ng-zorro-antd/popconfirm';
import {NzInputModule} from 'ng-zorro-antd/input';
import {EmailComponent} from './email/email.component';
import { FirebaseComponent } from './firebase/firebase.component';
import {NzSwitchModule} from 'ng-zorro-antd/switch';
import { SliderComponent } from './slider/slider.component';
import { TemplateEmailComponent } from './email/template-email/template-email.component';
import { UpdateEmailComponent } from './email/update-email/update-email.component';
import {NzFormModule} from 'ng-zorro-antd/form';
import { UpdateSliderComponent } from './slider/update-slider/update-slider.component';
import { UpdateFirebaseComponent } from './firebase/update-firebase/update-firebase.component';
import { TranscriptComponent } from './transcript/transcript.component';
import { RevAiComponent } from './rev-ai/rev-ai.component';
import { UpdateRevaiComponent } from './rev-ai/update-revai/update-revai.component';
import { KommunicateComponent } from './kommunicate/kommunicate.component';
import { UpdateKommunicateComponent } from './kommunicate/update-kommunicate/update-kommunicate.component';
import { GeminiComponent } from './gemini/gemini.component';
import { UpdateGeminiComponent } from './gemini/update-gemini/update-gemini.component';
import { UpdateTemplateEmailComponent } from './email/template-email/update-template-email/update-template-email.component';
import {NzPaginationModule} from 'ng-zorro-antd/pagination';
import { CrawlDataComponent } from './crawl-data/crawl-data.component';
import { CrawlConfigComponent } from './crawl-data/crawl-config/crawl-config.component';
import {NzModalModule} from 'ng-zorro-antd/modal';
import { KommunicateBotComponent } from './kommunicate/kommunicate-bot/kommunicate-bot.component';
import { UpdateKommunicateBotComponent } from './kommunicate/kommunicate-bot/update-kommunicate-bot/update-kommunicate-bot.component';
import {TranslateModule} from '@ngx-translate/core';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import { ConfigRevaiComponent } from './rev-ai/config-revai/config-revai.component';
import { UpdateConfigComponent } from './rev-ai/config-revai/update-config/update-config.component';
import { TemplateEmailDetailComponent } from './email/template-email/template-email-detail/template-email-detail.component';
import {EditorComponent} from '@tinymce/tinymce-angular';
import { CrawlComponent } from './crawl-data/crawl/crawl.component';
import {PopoverModule} from 'ngx-bootstrap/popover';
import { HistoryTranscriptComponent } from './transcript/history-transcript/history-transcript.component';
import { UpdateTinyComponent } from './tiny/update-tiny/update-tiny.component';
import { UpdateTinyConfigComponent } from './tiny/config-tiny/update-tiny-config/update-tiny-config.component';
import { ProfileComponent } from './profile/profile.component';
import {NzBadgeModule} from 'ng-zorro-antd/badge';
import {TinyComponent} from './tiny/tiny.component';
import {ConfigTinyComponent} from './tiny/config-tiny/config-tiny.component';
import { UpdateProfileComponent } from './profile/update-profile/update-profile.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { UpdateConfigCrawlComponent } from './crawl-data/crawl-config/update-config-crawl/update-config-crawl.component';
import {NzSelectModule} from "ng-zorro-antd/select";
import { UpdateTopicComponent } from './topic/update-topic/update-topic.component';
import {NzWaterMarkModule} from "ng-zorro-antd/water-mark";
import { HistoryUploadFirebaseComponent } from './firebase/history-upload-firebase/history-upload-firebase.component';
import { TranscriptDetailComponent } from './transcript/transcript-detail/transcript-detail.component';
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";

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
        EditPartComponent,
        ScoreComponent,
        FirebaseComponent,
        EmailComponent,
        SliderComponent,
        TemplateEmailComponent,
        UpdateEmailComponent,
        UpdateSliderComponent,
        UpdateFirebaseComponent,
        TranscriptComponent,
        RevAiComponent,
        UpdateRevaiComponent,
        KommunicateComponent,
        UpdateKommunicateComponent,
        GeminiComponent,
        UpdateGeminiComponent,
        UpdateTemplateEmailComponent,
        CrawlDataComponent,
        CrawlConfigComponent,
        KommunicateBotComponent,
        UpdateKommunicateBotComponent,
        ConfigRevaiComponent,
        UpdateConfigComponent,
        TemplateEmailDetailComponent,
        CrawlComponent,
        HistoryTranscriptComponent,
        TinyComponent,
        UpdateTinyComponent,
        UpdateTinyConfigComponent,
        ProfileComponent,
        ConfigTinyComponent,
        UpdateProfileComponent,
        ChangePasswordComponent,
        UpdateConfigCrawlComponent,
        UpdateTopicComponent,
        HistoryUploadFirebaseComponent,
        TranscriptDetailComponent
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
    NzTableModule,
    NzPopconfirmModule,
    NzInputModule,

    NzSwitchModule,
    NzFormModule,
    ReactiveFormsModule,
    NzPaginationModule,
    NzModalModule,
    TranslateModule,
    NzToolTipModule,
    EditorComponent,
    PopoverModule,
    NzBadgeModule,
    NzSelectModule,
    NzWaterMarkModule,
    NzDatePickerModule,
    BsDatepickerModule,
  ],
    exports: [
        PageHeaderComponent,
        AudioPlayerComponent
    ]
})
export class AdminModule {
}
