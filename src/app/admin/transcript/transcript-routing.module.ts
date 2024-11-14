import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TranscriptComponent} from './transcript.component';
import {HistoryTranscriptComponent} from './history-transcript/history-transcript.component';

const routes: Routes = [
  {
    path: 'get',
    component: TranscriptComponent
  }, {
    path: 'history',
    component: HistoryTranscriptComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TranscriptRoutingModule { }
