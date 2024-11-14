import { NgModule } from '@angular/core';

import { ProfileRoutingModule } from './profile-routing.module';
import {ShareAdminModule} from '../share-admin/share-admin.module';
import {ProfileComponent} from './profile.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {UpdateProfileComponent} from './update-profile/update-profile.component';
import {NgOptimizedImage} from '@angular/common';


@NgModule({
  declarations: [
    ProfileComponent,
    ChangePasswordComponent,
    UpdateProfileComponent
  ],
  imports: [
    ProfileRoutingModule,
    ShareAdminModule,
    NgOptimizedImage
  ]
})
export class ProfileModule { }
