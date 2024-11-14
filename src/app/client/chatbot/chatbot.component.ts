import {Component} from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent {
  isShow: boolean = true;
  isChatbot: boolean = true;
  constructor() {
  }

  toggleChatbot(): void {
    this.isShow = !this.isShow;
  }
}
