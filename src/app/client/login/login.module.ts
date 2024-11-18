import { NgModule } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module';
import {ShareClientModule} from '../share-client/share-client.module';
import {LoginComponent} from './login.component';
import {LoginPopupComponent} from './login-popup/login-popup.component';
import {OtpConfirmComponent} from './otp-confirm/otp-confirm.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {NgOptimizedImage} from '@angular/common';


@NgModule({
  declarations: [
    LoginComponent,
    LoginPopupComponent,
    OtpConfirmComponent,
    ForgotPasswordComponent
  ],
  imports: [
    ShareClientModule,
    LoginRoutingModule,
    NgOptimizedImage
  ]
})
export class LoginModule { }
