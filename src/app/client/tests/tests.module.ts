import {NgModule} from '@angular/core';

import {TestsRoutingModule} from './tests-routing.module';
import {TestsComponent} from './tests.component';
import {ShareClientModule} from '../share-client/share-client.module';
import {NzModalModule} from 'ng-zorro-antd/modal';


@NgModule({
  declarations: [
    TestsComponent
  ],
  imports: [
    ShareClientModule,
    TestsRoutingModule,
    NzModalModule
  ]
})
export class TestsModule {
}
