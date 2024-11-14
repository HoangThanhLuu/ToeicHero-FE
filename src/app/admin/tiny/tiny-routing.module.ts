import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'account/list',
    loadComponent: () => import('./tiny.component').then(m => m.TinyComponent)
  }, {
    path: 'account/update',
    loadComponent: () => import('./update-tiny/update-tiny.component').then(m => m.UpdateTinyComponent)
  }, {
    path: 'config/list',
    loadComponent: () => import('./config-tiny/config-tiny.component').then(m => m.ConfigTinyComponent)
  }, {
    path: 'config/update',
    loadComponent: () => import('./config-tiny/update-tiny-config/update-tiny-config.component').then(m => m.UpdateTinyConfigComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TinyRoutingModule {
}
