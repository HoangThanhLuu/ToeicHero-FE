import {NgModule} from '@angular/core';

import {UsersRoutingModule} from './users-routing.module';
import {UsersComponent} from './users.component';
import {UserActivityComponent} from './user-activity/user-activity.component';
import {ShareAdminModule} from '../share-admin/share-admin.module';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';


@NgModule({
  declarations: [
    UsersComponent,
    UserActivityComponent
  ],
  imports: [
    ShareAdminModule,
    UsersRoutingModule,
    BsDatepickerModule,
    NzAvatarModule
  ]
})
export class UsersModule {
}
