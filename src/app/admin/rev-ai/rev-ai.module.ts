import {NgModule} from '@angular/core';

import {RevAiRoutingModule} from './rev-ai-routing.module';
import {ShareAdminModule} from '../share-admin/share-admin.module';
import {RevAiComponent} from './rev-ai.component';
import {UpdateRevaiComponent} from './update-revai/update-revai.component';
import {ConfigRevaiComponent} from './config-revai/config-revai.component';
import {UpdateConfigComponent} from './config-revai/update-config/update-config.component';


@NgModule({
  declarations: [
    RevAiComponent,
    UpdateRevaiComponent,
    ConfigRevaiComponent,
    UpdateConfigComponent
  ],
  imports: [
    ShareAdminModule,
    RevAiRoutingModule
  ]
})
export class RevAiModule {
}
