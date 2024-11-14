import { NgModule } from '@angular/core';

import { TopicRoutingModule } from './topic-routing.module';
import {ShareAdminModule} from '../share-admin/share-admin.module';
import {TopicComponent} from './topic.component';
import {UpdateTopicComponent} from './update-topic/update-topic.component';
import {AddTopicComponent} from './add-topic/add-topic.component';
import {NzBadgeComponent} from 'ng-zorro-antd/badge';


@NgModule({
  declarations: [
    TopicComponent,
    UpdateTopicComponent,
    AddTopicComponent
  ],
    imports: [
        ShareAdminModule,
        TopicRoutingModule,
        NzBadgeComponent
    ]
})
export class TopicModule { }
