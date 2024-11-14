import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TestComponent} from './test.component';
import {StartComponent} from './start/start.component';
import {ClientGuardGuard} from '../../client-guard.guard';
import {ResultComponent} from './result/result.component';
import {PracticeComponent} from './practice/practice.component';
import {profileResolver} from '../../common/profile.service';

const routes: Routes = [
  {
    path: '',
    component: TestComponent
  },
  {
    path: 'start',
    resolve: [profileResolver],
    component: StartComponent
  },
  {
    path: 'result/:resultId',
    resolve: [profileResolver],
    component: ResultComponent
  },
  {
    path: 'practice',
    resolve: [profileResolver],
    component: PracticeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule {
}
