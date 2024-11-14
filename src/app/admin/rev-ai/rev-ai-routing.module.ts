import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RevAiComponent} from './rev-ai.component';
import {UpdateRevaiComponent} from './update-revai/update-revai.component';
import {UpdateConfigComponent} from './config-revai/update-config/update-config.component';
import {ConfigRevaiComponent} from './config-revai/config-revai.component';

const routes: Routes = [
  {
    path: 'account/list',
    component: RevAiComponent
  }, {
    path: 'account/update',
    component: UpdateRevaiComponent
  },
  {
    path: 'config/update',
    component: UpdateConfigComponent
  }, {
    path: 'config/list',
    component: ConfigRevaiComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RevAiRoutingModule {
}
