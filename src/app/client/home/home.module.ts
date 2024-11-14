import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import {ShareClientModule} from '../share-client/share-client.module';
import {HomeComponent} from './home.component';
import {CarouselComponent} from '../carousel/carousel.component';
import {AboutComponent} from '../about/about.component';
import {ServiceComponent} from '../service/service.component';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import {NgOptimizedImage} from '@angular/common';


@NgModule({
  declarations: [
    HomeComponent,
    CarouselComponent,
    AboutComponent,
    ServiceComponent
  ],
  imports: [
    ShareClientModule,
    HomeRoutingModule,
    CarouselModule,
    NgOptimizedImage
  ]
})
export class HomeModule { }
