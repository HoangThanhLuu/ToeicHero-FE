import {NgModule} from '@angular/core';

import {TranscriptRoutingModule} from './transcript-routing.module';
import {ShareAdminModule} from '../share-admin/share-admin.module';
import {TranscriptComponent} from './transcript.component';
import {TranscriptDetailComponent} from './transcript-detail/transcript-detail.component';
import {HistoryTranscriptComponent} from './history-transcript/history-transcript.component';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [
    TranscriptComponent,
    TranscriptDetailComponent,
    HistoryTranscriptComponent
  ],
  imports: [
    ShareAdminModule,
    TranscriptRoutingModule,
    BsDatepickerModule
  ]
})
export class TranscriptModule {
}
