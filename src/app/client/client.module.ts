import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ClientComponent} from './client.component';
import {HomeComponent} from './home/home.component';
import {ClientRoutingModule} from "./client-routing.module";
import {HeaderComponent} from './header/header.component';
import {LoginComponent} from './login/login.component';
import {FooterComponent} from './footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NavbarComponent} from './navbar/navbar.component';
import {CarouselComponent} from './carousel/carousel.component';
import {ServiceComponent} from './service/service.component';
import {CarouselModule} from "ngx-owl-carousel-o";
import {TopbarComponent} from './topbar/topbar.component';
import {AboutComponent} from './about/about.component';
import {TestComponent} from './test/test.component';
import {OtpConfirmComponent} from './login/otp-confirm/otp-confirm.component';
import {PageHeaderComponent} from './page-header/page-header.component';
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NgxSpinnerModule} from "ngx-spinner";
import {ListTestComponent} from './list-test/list-test.component';
import {ProfileComponent} from './profile/profile.component';
import {UpdateProfileComponent} from './profile/update-profile/update-profile.component';
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzEmptyModule} from "ng-zorro-antd/empty";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzButtonModule} from "ng-zorro-antd/button";

@NgModule({
  declarations: [
    ClientComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    FooterComponent,
    NavbarComponent,
    CarouselComponent,
    ServiceComponent,
    TopbarComponent,
    AboutComponent,
    TestComponent,
    OtpConfirmComponent,
    PageHeaderComponent,
    ListTestComponent,
    ProfileComponent,
    UpdateProfileComponent],
  imports: [
    NgbModule,
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    FontAwesomeModule,
    CarouselModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    NzAvatarModule,
    NgxSpinnerModule,
    NzTagModule,
    NzEmptyModule,
    NzTabsModule,
    NzCheckboxModule,
    NzGridModule,
    NzButtonModule,
  ],
  providers: [],
  exports: [
    HeaderComponent,
    NavbarComponent,
    FooterComponent
  ],
  bootstrap: [ClientComponent]
})
export class ClientModule {
}
