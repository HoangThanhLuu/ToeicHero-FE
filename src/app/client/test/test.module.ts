import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {TestRoutingModule} from './test-routing.module';
import {ShareClientModule} from '../share-client/share-client.module';
import {TestComponent} from './test.component';
import {StartComponent} from './start/start.component';
import {PracticeComponent} from './practice/practice.component';
import {PartTemplate1Component} from './part-template-1/part-template-1.component';
import {PartTemplate3Component} from './part-template-3/part-template-3.component';
import {PartTemplate2Component} from './part-template-2/part-template-2.component';
import {ResultComponent} from './result/result.component';
import {AudioPartComponent} from './audio-part/audio-part.component';
import {CommentComponent} from '../comment/comment.component';
import {ChatbotComponent} from '../chatbot/chatbot.component';
import {MarkdownComponent} from 'ngx-markdown';
import {NzCommentActionComponent, NzCommentComponent, NzCommentModule} from 'ng-zorro-antd/comment';
import {NzModalModule} from 'ng-zorro-antd/modal';


@NgModule({
  declarations: [
    TestComponent,
    StartComponent,
    PracticeComponent,
    PartTemplate1Component,
    PartTemplate2Component,
    PartTemplate3Component,
    AudioPartComponent,
    ResultComponent,
    CommentComponent,
    ChatbotComponent
  ],
  imports: [
    ShareClientModule,
    TestRoutingModule,
    MarkdownComponent,
    NzCommentComponent,
    NzCommentActionComponent,
    NzCommentModule,
    NzModalModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestModule {
}
