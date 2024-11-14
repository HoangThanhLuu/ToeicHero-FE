import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {RouterOutlet} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {
  BrowserAnimationsModule,
  provideAnimations
} from '@angular/platform-browser/animations';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgxSpinnerModule} from 'ngx-spinner';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {ModalModule} from 'ngx-bootstrap/modal';
import {ConfirmModalComponent} from './common/confirm-modal/confirm-modal.component';
import {NZ_I18N, en_US} from 'ng-zorro-antd/i18n';
import {DatePipe, registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {ToastrModule} from 'ngx-toastr';
import {AuthServiceService} from './auth-service.service';
import {ClientGuardGuard} from './client-guard.guard';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {TinyServiceService} from './common/tiny-service.service';
import {ProfileService} from './common/profile.service';
import {SafeHtmlPipe} from './common/pipe/safe-html.pipe';
import {MarkdownModule} from 'ngx-markdown';
import 'prismjs';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-highlight/prism-line-highlight.js';
import {DatetimeService} from './common/datetime.service';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ConfirmModalComponent,
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 1500,
      positionClass: 'toast-bottom-right',
      closeButton: true,
    }),
    NgxSpinnerModule.forRoot({type: 'ball-scale-multiple'}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
        deps: [HttpClient],
      },
      defaultLanguage: 'vi_VN',
    }),
    MarkdownModule.forRoot(),
  ],
  providers: [
    {provide: NZ_I18N, useValue: en_US},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthServiceService,
      multi: true
    },
    ClientGuardGuard,
    DatePipe,
    provideAnimations(),
    TinyServiceService,
    ProfileService,
    SafeHtmlPipe,
    DatetimeService
  ],
  exports: [FontAwesomeModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
