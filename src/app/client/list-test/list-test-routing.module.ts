import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListTestComponent} from './list-test.component';

const routes: Routes = [
  {
    path: '',
    component: ListTestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListTestRoutingModule {
}
