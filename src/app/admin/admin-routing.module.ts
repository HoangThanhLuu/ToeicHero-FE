import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AdminComponent} from "./admin.component";
import {ExamComponent} from "./exam/exam.component";
import {TopicComponent} from "./topic/topic.component";
import {UsersComponent} from "./users/users.component";
import {ExamDetailComponent} from "./exam/exam-detail/exam-detail.component";


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
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
