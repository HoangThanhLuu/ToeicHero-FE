import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history.component';
import {
    NzTableCellDirective,
    NzTbodyComponent,
    NzTheadComponent,
    NzThMeasureDirective,
    NzTrDirective
} from 'ng-zorro-antd/table';
import {PageHeaderComponent} from '../../page-header/page-header.component';
import {ShareAdminModule} from '../../share-admin/share-admin.module';


@NgModule({
  declarations: [
    HistoryComponent
  ],
    imports: [
        CommonModule,
        HistoryRoutingModule,
        NzTableCellDirective,
        NzTbodyComponent,
        NzThMeasureDirective,
        NzTheadComponent,
        NzTrDirective,
        PageHeaderComponent,
        ShareAdminModule
    ]
})
export class HistoryModule { }
