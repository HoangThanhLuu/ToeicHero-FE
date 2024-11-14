import {NgModule} from '@angular/core';

import {ResetPasswordRoutingModule} from './reset-password-routing.module';
import {ShareClientModule} from '../../share-client/share-client.module';
import {ResetPasswordComponent} from './reset-password.component';
import {NgOptimizedImage} from '@angular/common';


@NgModule({
  declarations: [
    ResetPasswordComponent
  ],
    imports: [
        ShareClientModule,
        ResetPasswordRoutingModule,
        NgOptimizedImage
    ]
})
export class ResetPasswordModule {
}
