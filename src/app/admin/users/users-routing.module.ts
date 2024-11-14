import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from './users.component';
import {UserActivityComponent} from './user-activity/user-activity.component';

const routes: Routes = [
  {
    path: 'manager',
    component: UsersComponent
  }, {
    path: 'activity',
    component: UserActivityComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
