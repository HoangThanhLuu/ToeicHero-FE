import {NgModule} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

import {ChatRoutingModule} from './chat-routing.module';
import {ChatComponent} from './chat.component';
import {ShareClientModule} from '../share-client/share-client.module';


@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    ShareClientModule,
    ChatRoutingModule,
    NgOptimizedImage
  ]
})
export class ChatModule {
}
