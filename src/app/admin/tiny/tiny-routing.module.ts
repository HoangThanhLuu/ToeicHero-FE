import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TinyComponent} from './tiny.component';
import {UpdateTinyComponent} from './update-tiny/update-tiny.component';
import {ConfigTinyComponent} from './config-tiny/config-tiny.component';
import {UpdateTinyConfigComponent} from './config-tiny/update-tiny-config/update-tiny-config.component';

const routes: Routes = [
  {
    path: 'account/list',
    component: TinyComponent
  }, {
    path: 'account/update',
    component: UpdateTinyComponent
  }, {
    path: 'config/list',
    component: ConfigTinyComponent
  }, {
    path: 'config/update',
    component: UpdateTinyConfigComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TinyRoutingModule {
}
