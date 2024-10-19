import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientComponent} from "./client.component";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {TestComponent} from "./test/test.component";
import {ListTestComponent} from "./list-test/list-test.component";
import {ProfileComponent} from "./profile/profile.component";
import {StartComponent} from "./test/start/start.component";


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
        component: LoginComponent
      }, {
        path: 'list-test',
        component: ListTestComponent
      }, {
        path: 'profile',
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
            component: StartComponent
          }
        ]
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
