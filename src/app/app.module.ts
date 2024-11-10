import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {
  BrowserAnimationsModule,
  provideAnimations
} from '@angular/platform-browser/animations';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgxSpinnerModule} from "ngx-spinner";
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {ModalModule} from "ngx-bootstrap/modal";
import {ClientModule} from "./client/client.module";
import {AdminModule} from "./admin/admin.module";
import {ConfirmModalComponent} from './common/confirm-modal/confirm-modal.component';
import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {DatePipe, registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {ToastrModule} from "ngx-toastr";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzImageModule} from "ng-zorro-antd/image";
import {AuthServiceService} from "./auth-service.service";
import {ClientGuardGuard} from "./client-guard.guard";
import {SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider} from '@abacritt/angularx-social-login';
import {FACEBOOK_APP_ID} from "./common/constant";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {TinyServiceService} from "./common/tiny-service.service";

registerLocaleData(en);
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ConfirmModalComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterOutlet,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    FormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    ClientModule,
    AdminModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      positionClass: 'toast-bottom-right',
      closeButton: true,
    }),
    NgxSpinnerModule.forRoot({type: 'ball-scale-multiple'}),
    NzModalModule,
    NzAvatarModule,
    NzImageModule,
    SocialLoginModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
        deps: [HttpClient],
      },
      defaultLanguage: 'vi_VN',
    }),
  ],
  providers: [
    {provide: NZ_I18N, useValue: en},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthServiceService,
      multi: true
    },
    ClientGuardGuard,
    DatePipe,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '979931356007-03ed2esa3j6gl56rom12robrgln5iop3.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(FACEBOOK_APP_ID)
          }
        ],
        onError: (err) => {
        }
      } as SocialAuthServiceConfig,
    },
    provideAnimations(),
    TinyServiceService
  ],
  exports: [FontAwesomeModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
