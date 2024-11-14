import {NgModule} from '@angular/core';
import {
  CommonModule, NgOptimizedImage,
} from '@angular/common';
import {ClientComponent} from './client.component';
import {ClientRoutingModule} from "./client-routing.module";
import {FooterComponent} from './footer/footer.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NavbarComponent} from './navbar/navbar.component';
import {TopbarComponent} from './topbar/topbar.component';
import {NgxSpinnerModule} from 'ngx-spinner';

@NgModule({
  declarations: [
    ClientComponent,
    FooterComponent,
    NavbarComponent,
    TopbarComponent,
  ],
  imports: [
    NgbModule,
    CommonModule,
    NgxSpinnerModule,
    ClientRoutingModule,
    NgOptimizedImage
  ],
  providers: [],
  exports: [
    NavbarComponent,
    FooterComponent,
  ],
  bootstrap: [ClientComponent]
})
export class ClientModule {
}
