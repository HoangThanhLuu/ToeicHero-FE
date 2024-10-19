import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientComponent} from "./client.component";
import {HomeComponent} from "./home/home.component";
import {TestComponent} from "./test/test.component";
import {ListTestComponent} from "./list-test/list-test.component";
import {ProfileComponent} from "./profile/profile.component";
import {StartComponent} from "./test/start/start.component";
import {LoginPopupComponent} from "./login/login-popup/login-popup.component";
import {ResultComponent} from "./test/result/result.component";
import {PracticeComponent} from "./test/practice/practice.component";
import {ClientGuardGuard} from "../client-guard.guard";
import {HistoryExamComponent} from "./history-exam/history-exam.component";

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }, {
        path: 'home',
        component: HomeComponent
      }, {
        path: 'login',
        component: LoginPopupComponent
      }, {
        path: 'list-test',
        component: ListTestComponent
      }, {
        path: 'profile',
        canActivate: [ClientGuardGuard],
        component: ProfileComponent
      }, {
        path: 'test/:examId',
        children: [
          {
            path: '',
            component: TestComponent
          },
          {
            path: 'start',
            canActivate: [ClientGuardGuard],
            component: StartComponent
          },
          {
            path: 'result/:resultId',
            canActivate: [ClientGuardGuard],
            component: ResultComponent
          },
          {
            path: 'practice',
            canActivate: [ClientGuardGuard],
            component: PracticeComponent
          }
        ]
      },
      {
        path: 'my-exam',
        canActivate: [ClientGuardGuard],
        component: HistoryExamComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {
}
