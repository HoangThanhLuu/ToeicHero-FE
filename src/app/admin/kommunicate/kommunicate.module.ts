import { NgModule } from '@angular/core';

import { KommunicateRoutingModule } from './kommunicate-routing.module';
import {ShareAdminModule} from '../share-admin/share-admin.module';
import {KommunicateComponent} from './kommunicate.component';
import {KommunicateBotComponent} from './kommunicate-bot/kommunicate-bot.component';
import {UpdateKommunicateBotComponent} from './kommunicate-bot/update-kommunicate-bot/update-kommunicate-bot.component';
import {UpdateKommunicateComponent} from './update-kommunicate/update-kommunicate.component';


@NgModule({
  declarations: [
    KommunicateComponent,
    KommunicateBotComponent,
    UpdateKommunicateBotComponent,
    UpdateKommunicateComponent
  ],
  imports: [
    ShareAdminModule,
    KommunicateRoutingModule
  ]
})
export class KommunicateModule { }
