import { NgModule } from '@angular/core';

import { ScoreRoutingModule } from './score-routing.module';
import {ScoreComponent} from './score.component';
import {ShareAdminModule} from '../share-admin/share-admin.module';
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';
import {NzInputDirective} from 'ng-zorro-antd/input';


@NgModule({
  declarations: [
    ScoreComponent
  ],
  imports: [
    ShareAdminModule,
    ScoreRoutingModule,
    NzPopconfirmDirective,
    NzInputDirective
  ]
})
export class ScoreModule { }
