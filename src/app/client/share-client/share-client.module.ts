import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShareClientRoutingModule} from './share-client-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NgxSpinnerModule} from 'ngx-spinner';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzEmptyModule} from 'ng-zorro-antd/empty';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {NzImageModule} from 'ng-zorro-antd/image';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzListModule} from 'ng-zorro-antd/list';
import {NzTypographyModule} from 'ng-zorro-antd/typography';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzTimePickerModule} from 'ng-zorro-antd/time-picker';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {NzCollapseModule} from 'ng-zorro-antd/collapse';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzPaginationModule} from 'ng-zorro-antd/pagination';
import {NzProgressModule} from 'ng-zorro-antd/progress';
import {ConnectionServiceModule} from 'ng-connection-service';
import {PageHeaderComponent} from '../page-header/page-header.component';


@NgModule({
  declarations: [
    PageHeaderComponent
  ],
  imports: [
    CommonModule,
    ShareClientRoutingModule
  ],
  exports: [
    NgbModule,
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NzAvatarModule,
    NgxSpinnerModule,
    NzTagModule,
    NzEmptyModule,
    NzTabsModule,
    NzCheckboxModule,
    NzGridModule,
    NzButtonModule,
    NzRadioModule,
    NzImageModule,
    NzDividerModule,
    NzCardModule,
    NzIconModule,
    NzListModule,
    NzTypographyModule,
    NzFormModule,
    NzDatePickerModule,
    NzSelectModule,
    NzInputNumberModule,
    NzInputModule,
    NzTimePickerModule,
    TooltipModule,
    NzCollapseModule,
    NzTableModule,
    NzToolTipModule,
    NzPaginationModule,
    NzProgressModule,
    ConnectionServiceModule,
    PageHeaderComponent
  ]
})
export class ShareClientModule {
}
