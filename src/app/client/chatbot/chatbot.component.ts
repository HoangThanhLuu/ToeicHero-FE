import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {CONSTANT} from '../../common/constant';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  isShow: boolean = true;
  isChatbot: boolean = true;
  selectedModel: ModelAI = ModelAI.PALM2;
  isLoading: boolean = false;
  mappingModel: Map<ModelAI, () => void> = new Map<ModelAI, () => void>([
    [ModelAI.CHAT_GPT, this.chatGPTChat.bind(this)],
    [ModelAI.GEMINI, this.geminiChat.bind(this)],
    [ModelAI.LLAMAS, this.llamasChat.bind(this)],
    [ModelAI.PALM2, this.palm2Chat.bind(this)],
  ]);

  params: Params = new Params();
  listChat: Chat[] = [
    new Chat('Hello', 'Hi, how can I help you?'),
    new Chat('What is your name?', 'My name is Chatbot'),
    new Chat('What is your name', `"**English grammar:**\n\n**Pronouns:**\n\n* Pronouns are words that replace nouns.\n\n* **Personal pronouns** refer to specific people or things. They include:\n    * **Subject pronouns:** I, you, he, she, it, we, they\n    * **Object pronouns:** me, you, him, her, it, us, them\n    * **Possessive pronouns:** my, your, his, her, its, our, their\n    * **Reflexive pronouns:** myself, yourself, himself, herself, itself, ourselves, yourselves, themselves\n\n**Usage of pronouns:**\n\n* Personal pronouns are used to avoid repeating nouns.\n* Subject pronouns are used as the subject of a sentence.\n* Object pronouns are used as the object of a verb or preposition.\n* Possessive pronouns are used to indicate ownership.\n* Reflexive pronouns are used when the subject and object of a verb are the same.\n\n**Answer to the question:**\n\nThe correct answer is **B. his**.\n\nIn this sentence, the pronoun replaces the noun \"Ken Nakata.\" Since \"Ken Nakata\" is a male, we use the possessive pronoun \"his.\""`)
  ];

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {
  }

  chat() {
    if (this.params.prompt) {
      this.mappingModel.get(this.selectedModel)?.();
    }
  }

  chatGPTChat() {
    console.log('chatGPTChat')
  }

  geminiChat() {
    console.log('geminiChat')
  }

  palm2Chat() {
    this.addMessage(this.params.prompt, `"**English grammar:**\n\n**Pronouns:**\n\n* Pronouns are words that replace nouns.\n\n* **Personal pronouns** refer to specific people or things. They include:\n    * **Subject pronouns:** I, you, he, she, it, we, they\n    * **Object pronouns:** me, you, him, her, it, us, them\n    * **Possessive pronouns:** my, your, his, her, its, our, their\n    * **Reflexive pronouns:** myself, yourself, himself, herself, itself, ourselves, yourselves, themselves\n\n**Usage of pronouns:**\n\n* Personal pronouns are used to avoid repeating nouns.\n* Subject pronouns are used as the subject of a sentence.\n* Object pronouns are used as the object of a verb or preposition.\n* Possessive pronouns are used to indicate ownership.\n* Reflexive pronouns are used when the subject and object of a verb are the same.\n\n**Answer to the question:**\n\nThe correct answer is **B. his**.\n\nIn this sentence, the pronoun replaces the noun \"Ken Nakata.\" Since \"Ken Nakata\" is a male, we use the possessive pronoun \"his.\""`);
  }

  llamasChat() {
    this.isLoading = true;
    this.http.post(`/api/llm/ask`, {input: this.params.prompt})
      .subscribe({
        next: (res: any) => {
          if (res?.success) {
            this.addMessage(this.params.prompt, res?.data);
          } else {
            this.addMessage(this.params.prompt, CONSTANT.error);
          }
          this.params.prompt = '';
          this.isLoading = false;
        },
        error: (_) => {
          this.toastr.error('error')
          this.addMessage(this.params.prompt, CONSTANT.error);
        }
      });

  }

  toggleChatbot(): void {
    this.isShow = !this.isShow;
    // remove chatContainer

  }

  addMessage(question: string, answer: string) {
    this.listChat = [...this.listChat, new Chat(question, answer)];
    this.cdr.detectChanges();
    this.scrollToBottom();
  }

  test() {
    console.log(this.listChat)
  }

  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight + 200;
    } catch (err) {
      console.error('Scroll to bottom error:', err);
    }
  }

  protected readonly ModelAI = ModelAI;
}


export class Chat {
  question: string;
  answer: string;

  constructor(question: string = '', answer: string = '') {
    this.question = question;
    this.answer = answer;
  }
}

export class Params {
  listMsg: Msg[];
  prompt: string;

  constructor(listMsg: Msg[] = [], prompt: string = '') {
    this.listMsg = listMsg;
    this.prompt = prompt;
  }
}

export class Msg {
  text: string;
  type: string;

  constructor(text: string = '', type: string = 'user') {
    this.text = text;
    this.type = type;
  }
}

export enum ModelAI {
  CHAT_GPT = 'chat-gpt',
  GEMINI = 'gemini',
  LLAMAS = 'llamas',
  PALM2 = 'palm2',
}
