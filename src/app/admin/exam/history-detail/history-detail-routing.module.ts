import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryDetailComponent } from './history-detail.component';

const routes: Routes = [{ path: '', component: HistoryDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryDetailRoutingModule { }
