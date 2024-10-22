import {NgModule} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
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
import {CrawlComponent} from "./crawl-data/crawl/crawl.component";
import {CrawlHistoryComponent} from "./crawl-data/crawl-history/crawl-history.component";

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
            path: 'list',
            component: ExamComponent
          },
          {
            path: 'detail',
            component: ExamDetailComponent
          }
        ]
      }, {
        path: 'topic',
        children: [
          {
            path: 'list',
            component: TopicComponent
          }, {
            path: 'add',
            component: AddTopicComponent
          }
        ]
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
      }, {
        path: 'addExam',
        component: AddExamComponent
      }, {
        path: 'firebase',
        children: [
          {
            path: 'list',
            component: FirebaseComponent
          },
          {
            path: 'update',
            component: UpdateFirebaseComponent
          }
        ]
      }, {
        path: 'email',
        children: [
          {
            path: 'account',
            children: [
              {
                path: 'list',
                component: EmailComponent
              }, {
                path: 'update',
                component: UpdateEmailComponent
              }
            ]
          }, {
            path: 'template-email',
            children: [
              {
                path: 'list',
                component: TemplateEmailComponent
              }, {
                path: 'update',
                component: UpdateTemplateEmailComponent
              }
            ]
          }
        ]
      }, {
        path: 'slider',
        children: [
          {
            path: 'list',
            component: SliderComponent
          }, {
            path: 'update',
            component: UpdateSliderComponent
          }
        ]
      }, {
        path: 'transcript',
        component: TranscriptComponent
      }, {
        path: 'rev-ai',
        children: [
          {
            path: 'account',
            children: [
              {
                path: 'list',
                component: RevAiComponent
              }, {
                path: 'update',
                component: UpdateRevaiComponent
              }
            ]
          },
          {
            path: 'config',
            children: [
              {
                path: 'update',
                component: UpdateConfigComponent
              }, {
                path: 'list',
                component: ConfigRevaiComponent
              }
            ]
          }
        ]
      }, {
        path: 'kommunicate',
        children: [
          {
            path: 'account',
            children: [
              {
                path: 'list',
                component: KommunicateComponent
              }, {
                path: 'update',
                component: UpdateKommunicateComponent
              }
            ]
          },
          {
            path: 'bot',
            children: [
              {
                path: 'list',
                component: KommunicateBotComponent
              }, {
                path: 'update',
                component: UpdateKommunicateBotComponent
              }
            ]
          }
        ]
      }, {
        path: 'gemini',
        component: GeminiComponent
      }, {
        path: 'update-gemini',
        component: UpdateGeminiComponent
      }, {
        path: 'crawl',
        children: [
          {
            path: 'list',
            component: CrawlDataComponent
          }, {
            path: 'config',
            component: CrawlConfigComponent
          }, {
            path: 'get',
            component: CrawlComponent
          }, {
            path: 'history',
            component: CrawlHistoryComponent
          }
        ]
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
