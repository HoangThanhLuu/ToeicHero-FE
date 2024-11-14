import { NgModule } from '@angular/core';

import { ProfileRoutingModule } from './profile-routing.module';
import {ShareClientModule} from '../share-client/share-client.module';
import {ProfileComponent} from './profile.component';
import {UpdateProfileComponent} from './update-profile/update-profile.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {NgOptimizedImage} from '@angular/common';


@NgModule({
  declarations: [
    ProfileComponent,
    UpdateProfileComponent,
    ChangePasswordComponent
  ],
  imports: [
    ShareClientModule,
    ProfileRoutingModule,
    NgOptimizedImage
  ]
})
export class ProfileModule { }
