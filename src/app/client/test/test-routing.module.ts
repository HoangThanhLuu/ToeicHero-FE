import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TestComponent} from './test.component';
import {StartComponent} from './start/start.component';
import {ClientGuardGuard} from '../../client-guard.guard';
import {ResultComponent} from './result/result.component';
import {PracticeComponent} from './practice/practice.component';

const routes: Routes = [
  {
    path: '',
    component: TestComponent
  },
  {
    path: 'start',
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule {
}
