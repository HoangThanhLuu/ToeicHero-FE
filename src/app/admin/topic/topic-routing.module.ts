import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'list',
    loadComponent: () => import('./topic.component').then(m => m.TopicComponent)
  }, {
    path: 'add',
    loadComponent: () => import('./add-topic/add-topic.component').then(m => m.AddTopicComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicRoutingModule {
}
