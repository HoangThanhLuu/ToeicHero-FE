import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AdminComponent} from "./admin.component";
import {ExamComponent} from "./exam/exam.component";
import {TopicComponent} from "./topic/topic.component";
import {UsersComponent} from "./users/users.component";
import {ExamDetailComponent} from "./exam/exam-detail/exam-detail.component";
import {QuestionComponent} from "./exam/question/question.component";
import {ScoreComponent} from "./score/score.component";
import {AddTopicComponent} from "./topic/add-topic/add-topic.component";
import {AddExamComponent} from "./exam/add-exam/add-exam.component";
import {EmailComponent} from "./email/email.component";
import {FirebaseComponent} from "./firebase/firebase.component";
import {SliderComponent} from "./slider/slider.component";
import {TemplateEmailComponent} from "./email/template-email/template-email.component";
import {UpdateEmailComponent} from "./email/update-email/update-email.component";
import {UpdateSliderComponent} from "./slider/update-slider/update-slider.component";
import {UpdateFirebaseComponent} from "./firebase/update-firebase/update-firebase.component";
import {TranscriptComponent} from "./transcript/transcript.component";
import {RevAiComponent} from "./rev-ai/rev-ai.component";
import {UpdateRevaiComponent} from "./rev-ai/update-revai/update-revai.component";
import {UpdateKommunicateComponent} from "./kommunicate/update-kommunicate/update-kommunicate.component";
import {KommunicateComponent} from "./kommunicate/kommunicate.component";
import {GeminiComponent} from "./gemini/gemini.component";
import {UpdateGeminiComponent} from "./gemini/update-gemini/update-gemini.component";
import {
  UpdateTemplateEmailComponent
} from "./email/template-email/update-template-email/update-template-email.component";
import {CrawlDataComponent} from "./crawl-data/crawl-data.component";
import {CrawlConfigComponent} from "./crawl-data/crawl-config/crawl-config.component";
import {KommunicateBotComponent} from "./kommunicate/kommunicate-bot/kommunicate-bot.component";
import {
  UpdateKommunicateBotComponent
} from "./kommunicate/kommunicate-bot/update-kommunicate-bot/update-kommunicate-bot.component";
import {ConfigRevaiComponent} from "./rev-ai/config-revai/config-revai.component";
import {UpdateConfigComponent} from "./rev-ai/config-revai/update-config/update-config.component";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      }, {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'exam',
        children: [
          {
            path: '',
            component: ExamComponent
          },
          {
            path: 'detail',
            component: ExamDetailComponent
          }
        ]
      }, {
        path: 'topic',
        component: TopicComponent
      }, {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'question',
        children: [
          {
            path: 'list-by-part',
            component: QuestionComponent
          }
        ]
      }, {
        path: 'score',
        component: ScoreComponent
      },{
        path: 'addTopic',
        component: AddTopicComponent
      }, {
        path: 'addExam',
        component: AddExamComponent
      }, {
        path: 'firebase',
        component: FirebaseComponent
      }, {
        path: 'email',
        component: EmailComponent
      }, {
        path: 'slider',
        component: SliderComponent
      }, {
        path: 'template-email',
        component: TemplateEmailComponent
      }, {
        path: 'update-template-email',
        component: UpdateTemplateEmailComponent
      }, {
        path: 'update-email',
        component: UpdateEmailComponent
      }, {
        path: 'update-slider',
        component: UpdateSliderComponent
      }, {
        path: 'update-firebase',
        component: UpdateFirebaseComponent
      }, {
        path: 'transcript',
        component: TranscriptComponent
      }, {
        path: 'rev-ai',
        component: RevAiComponent
      }, {
        path: 'update-revai',
        component: UpdateRevaiComponent
      }, {
        path: 'update-config-revai',
        component: UpdateConfigComponent
      }, {
        path: 'config-revai',
        component: ConfigRevaiComponent
      },{
        path: 'update-kommunicate',
        component: UpdateKommunicateComponent
      }, {
        path: 'kommunicate',
        component: KommunicateComponent
      }, {
        path: 'gemini',
        component: GeminiComponent
      }, {
        path: 'update-gemini',
        component: UpdateGeminiComponent
      }, {
        path: 'crawl-data',
        component: CrawlDataComponent
      }, {
        path: 'crawl-config',
        component: CrawlConfigComponent
      }, {
        path: 'kommunicate-bot',
        component: KommunicateBotComponent
      }, {
        path: 'update-kommunicate-bot',
        component: UpdateKommunicateBotComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
}
