import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgxSpinnerModule} from "ngx-spinner";
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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
    ModalModule.forRoot(),
    ClientModule,
    AdminModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      positionClass: 'toast-bottom-right',
      closeButton: true,
    }),
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    NzModalModule,
    NzAvatarModule,
    NzImageModule,
  ],
  providers: [
    {provide: NZ_I18N, useValue: en},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthServiceService,
      multi: true
    },
    ClientGuardGuard,
    DatePipe
  ],
  exports: [FontAwesomeModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
