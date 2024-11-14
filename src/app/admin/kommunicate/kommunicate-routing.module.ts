import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {KommunicateComponent} from './kommunicate.component';
import {UpdateKommunicateComponent} from './update-kommunicate/update-kommunicate.component';
import {KommunicateBotComponent} from './kommunicate-bot/kommunicate-bot.component';
import {UpdateKommunicateBotComponent} from './kommunicate-bot/update-kommunicate-bot/update-kommunicate-bot.component';

const routes: Routes = [
  {
    path: 'account/list',
    component: KommunicateComponent
  }, {
    path: 'account/update',
    component: UpdateKommunicateComponent
  },
  {
    path: 'bot/list',
    component: KommunicateBotComponent
  }, {
    path: 'bot/update',
    component: UpdateKommunicateBotComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KommunicateRoutingModule {
}
