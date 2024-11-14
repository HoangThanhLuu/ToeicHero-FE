import { NgModule } from '@angular/core';

import { ListTestRoutingModule } from './list-test-routing.module';
import {ShareClientModule} from '../share-client/share-client.module';
import {ListTestComponent} from './list-test.component';


@NgModule({
  declarations: [
    ListTestComponent
  ],
  imports: [
    ShareClientModule,
    ListTestRoutingModule
  ]
})
export class ListTestModule { }
