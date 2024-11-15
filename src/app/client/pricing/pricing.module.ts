import { NgModule } from '@angular/core';
import { PricingRoutingModule } from './pricing-routing.module';
import { PricingComponent } from './pricing.component';
import {ShareClientModule} from '../share-client/share-client.module';


@NgModule({
  declarations: [
    PricingComponent
  ],
  imports: [
    ShareClientModule,
    PricingRoutingModule
  ]
})
export class PricingModule { }
