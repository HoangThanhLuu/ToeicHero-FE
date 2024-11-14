import { NgModule } from '@angular/core';

import { TinyRoutingModule } from './tiny-routing.module';
import {ShareAdminModule} from '../share-admin/share-admin.module';
import {TinyComponent} from './tiny.component';
import {UpdateTinyComponent} from './update-tiny/update-tiny.component';
import {UpdateTinyConfigComponent} from './config-tiny/update-tiny-config/update-tiny-config.component';
import {ConfigTinyComponent} from './config-tiny/config-tiny.component';


@NgModule({
  declarations: [
    TinyComponent,
    UpdateTinyComponent,
    UpdateTinyConfigComponent,
    ConfigTinyComponent
  ],
  imports: [
    ShareAdminModule,
    TinyRoutingModule
  ]
})
export class TinyModule { }
