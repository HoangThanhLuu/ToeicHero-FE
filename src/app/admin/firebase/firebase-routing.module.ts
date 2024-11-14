import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FirebaseComponent} from './firebase.component';
import {UpdateFirebaseComponent} from './update-firebase/update-firebase.component';
import {HistoryUploadFirebaseComponent} from './history-upload-firebase/history-upload-firebase.component';

const routes: Routes = [
  {
    path: 'list',
    component: FirebaseComponent
  },
  {
    path: 'update',
    component: UpdateFirebaseComponent
  },
  {
    path: 'history',
    component: HistoryUploadFirebaseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FirebaseRoutingModule {
}
