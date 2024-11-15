import {NgModule} from '@angular/core';

import {PriceRoutingModule} from './price-routing.module';
import {PriceComponent} from './price.component';
import {ShareAdminModule} from '../share-admin/share-admin.module';
import {AddPlanComponent} from './add-plan/add-plan.component';
import {NzDatePickerComponent} from 'ng-zorro-antd/date-picker';


@NgModule({
  declarations: [
    PriceComponent,
    AddPlanComponent
  ],
  imports: [
    ShareAdminModule,
    PriceRoutingModule,
    NzDatePickerComponent,
  ]
})
export class PriceModule {
}
