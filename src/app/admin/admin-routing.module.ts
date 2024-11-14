import {NgModule} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {AdminComponent} from './admin.component';
import {HomeComponent} from './home/home.component';
import {ScoreComponent} from './score/score.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)},
      {path: 'exam', loadChildren: () => import('./exam/exam.module').then(m => m.ExamModule)},
      {path: 'topic', loadChildren: () => import('./topic/topic.module').then(m => m.TopicModule)},
      {path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule)},
      {path: 'score', component: ScoreComponent},
      {path: 'firebase', loadChildren: () => import('./firebase/firebase.module').then(m => m.FirebaseModule)},
      {path: 'email', loadChildren: () => import('./email/email.module').then(m => m.EmailModule)},
      {path: 'slider', loadChildren: () => import('./slider/slider.module').then(m => m.SliderModule)},
      {path: 'transcript', loadChildren: () => import('./transcript/transcript.module').then(m => m.TranscriptModule)},
      {path: 'rev-ai', loadChildren: () => import('./rev-ai/rev-ai.module').then(m => m.RevAiModule)},
      {
        path: 'kommunicate',
        loadChildren: () => import('./kommunicate/kommunicate.module').then(m => m.KommunicateModule)
      },
      {path: 'crawl', loadChildren: () => import('./crawl-data/crawl.module').then(m => m.CrawlModule)},
      {path: 'tiny', loadChildren: () => import('./tiny/tiny.module').then(m => m.TinyModule)},
      {path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule)}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
}
