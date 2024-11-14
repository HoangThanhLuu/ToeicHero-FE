import { NgModule } from '@angular/core';

import { SliderRoutingModule } from './slider-routing.module';
import {ShareAdminModule} from '../share-admin/share-admin.module';
import {SliderComponent} from './slider.component';
import {UpdateSliderComponent} from './update-slider/update-slider.component';
import {NzBadgeComponent} from 'ng-zorro-antd/badge';


@NgModule({
  declarations: [
    SliderComponent,
    UpdateSliderComponent
  ],
  imports: [
    ShareAdminModule,
    SliderRoutingModule,
    NzBadgeComponent
  ]
})
export class SliderModule { }
