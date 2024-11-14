import {NgModule} from '@angular/core';

import {EmailRoutingModule} from './email-routing.module';
import {ShareAdminModule} from '../share-admin/share-admin.module';
import {EmailComponent} from './email.component';
import {UpdateEmailComponent} from './update-email/update-email.component';
import {TemplateEmailComponent} from './template-email/template-email.component';
import {UpdateTemplateEmailComponent} from './template-email/update-template-email/update-template-email.component';
import {SafeHtmlPipe} from '../../common/pipe/safe-html.pipe';
import {TemplateEmailDetailComponent} from './template-email/template-email-detail/template-email-detail.component';
import {EditorComponent} from '@tinymce/tinymce-angular';


@NgModule({
  declarations: [
    EmailComponent,
    UpdateEmailComponent,
    TemplateEmailComponent,
    TemplateEmailDetailComponent,
    UpdateTemplateEmailComponent
  ],
  imports: [
    ShareAdminModule,
    EmailRoutingModule,
    EditorComponent,
    SafeHtmlPipe
  ],
  providers: [
    SafeHtmlPipe
  ]
})
export class EmailModule {
}
