import { NgModule } from '@angular/core';
import { PricingRoutingModule } from './pricing-routing.module';
import { PricingComponent } from './pricing.component';
import {ShareClientModule} from '../share-client/share-client.module';
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {NgOptimizedImage} from '@angular/common';


@NgModule({
  declarations: [
    PricingComponent
  ],
  imports: [
    ShareClientModule,
    NzDrawerModule,
    PricingRoutingModule,
    NgOptimizedImage
  ]
})
export class PricingModule { }
