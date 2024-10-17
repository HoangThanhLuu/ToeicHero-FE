import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { ClientComponent } from './client.component';
import { HomeComponent } from './home/home.component';
import {ClientRoutingModule} from "./client-routing.module";
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { NavbarComponent } from './navbar/navbar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ServiceComponent } from './service/service.component';
import {CarouselModule} from "ngx-owl-carousel-o";
import { TopbarComponent } from './topbar/topbar.component';
import { AboutComponent } from './about/about.component';


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
    AboutComponent
  ],
    imports: [
        NgbModule,
        CommonModule,
        ClientRoutingModule,
        FormsModule,
        FontAwesomeModule,
        CarouselModule,
        NgOptimizedImage,
        ReactiveFormsModule,
    ],
  providers: [],
  exports: [
    HeaderComponent,
    NavbarComponent,
    FooterComponent
  ],
  bootstrap: [ClientComponent]
})
export class ClientModule { }
