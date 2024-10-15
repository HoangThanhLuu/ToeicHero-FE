import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {AdminComponent} from './admin.component';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './navbar/navbar.component';

import {AdminRoutingModule} from "./admin-routing.module";
import {FooterAdminComponent} from './footer/footer.component';


// @ts-ignore
@NgModule({
  declarations: [
    AdminComponent,
    HomeComponent,
    NavbarComponent,
    FooterAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
})
export class AdminModule {
}
