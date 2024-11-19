import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TopicComponent} from './topic.component';
import {AddTopicComponent} from './add-topic/add-topic.component';

const routes: Routes = [
  {
    path: 'list',
    component: TopicComponent
  }, {
    path: 'add',
    component: AddTopicComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicRoutingModule {
}
