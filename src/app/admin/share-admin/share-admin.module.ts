import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShareAdminRoutingModule} from './share-admin-routing.module';
import {NzUploadModule} from 'ng-zorro-antd/upload';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-spinner';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzImageModule} from 'ng-zorro-antd/image';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzSwitchModule} from 'ng-zorro-antd/switch';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzPaginationModule} from 'ng-zorro-antd/pagination';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzWaterMarkModule} from 'ng-zorro-antd/water-mark';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {AudioPlayerComponent} from '../exam/audio-player/audio-player.component';
import {PageHeaderComponent} from '../page-header/page-header.component';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AudioPlayerComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    ShareAdminRoutingModule,
    PageHeaderComponent
  ],
  exports: [
    CommonModule,
    NzUploadModule,
    NzIconModule,
    FormsModule,
    NgxSpinnerModule,
    NzButtonModule,
    TooltipModule,
    NzAvatarModule,
    NzImageModule,
    NzModalModule,
    NzTableModule,
    NzSwitchModule,
    NzFormModule,
    ReactiveFormsModule,
    NzPaginationModule,
    NzModalModule,
    TranslateModule,
    NzSelectModule,
    NzWaterMarkModule,
    NzSpinModule,
    AudioPlayerComponent,
    PageHeaderComponent
  ],
  providers: [TranslateService]
})
export class ShareAdminModule {
  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang('en_US');
  }
}
