import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import {ShareAdminModule} from '../share-admin/share-admin.module';
import {HomeComponent} from './home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    HomeRoutingModule,
    ShareAdminModule
  ]
})
export class HomeModule { }
