import { NgModule } from '@angular/core';

import { FirebaseRoutingModule } from './firebase-routing.module';
import {ShareAdminModule} from '../share-admin/share-admin.module';
import {UpdateFirebaseComponent} from './update-firebase/update-firebase.component';
import {FirebaseComponent} from './firebase.component';
import {HistoryUploadFirebaseComponent} from './history-upload-firebase/history-upload-firebase.component';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {PopoverModule} from 'ngx-bootstrap/popover';


@NgModule({
  declarations: [
    UpdateFirebaseComponent,
    FirebaseComponent,
    HistoryUploadFirebaseComponent
  ],
  imports: [
    ShareAdminModule,
    FirebaseRoutingModule,
    BsDatepickerModule,
    PopoverModule
  ]
})
export class FirebaseModule { }
