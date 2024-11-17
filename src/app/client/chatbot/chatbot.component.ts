import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {CONSTANT} from '../../common/constant';
import {ProfileService} from '../../common/profile.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent implements OnInit {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  isShow: boolean = false;
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
  listChat: Chat[] = [];
  listTranslate: Chat[] = [];
  noAllowFullBot: boolean = false;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private profile: ProfileService
  ) {
  }

  ngOnInit(): void {
    this.isEnableFullBot();
  }

  chat() {
    if (this.params.prompt.trim()) {
      if (this.isChatbot) {
        this.mappingModel.get(this.selectedModel)?.apply(this);
      } else {
        this.translate();
      }
    }
  }

  isEnableFullBot() {
    this.profile.getProfileData().subscribe({
      next: (profile) => {
        if (profile) {
          console.log(profile)
          this.noAllowFullBot = profile.userType !== 'VIP_USER';
        }
      }
    });
  }

  translate() {
    this.isLoading = true;
    this.http.post('api/translate', this.params.prompt)
      .subscribe({
        next: (res: any) => {
          if (res?.success && res?.data) {
            this.addTranslate(this.params.prompt, res?.data);
          } else {
            this.addTranslate(this.params.prompt, CONSTANT.error);
          }
          this.params.prompt = '';
          this.isLoading = false;
        },
        error: _ => {
          this.toastr.error(CONSTANT.error);
          this.addTranslate(this.params.prompt, CONSTANT.error);
          this.isLoading = false;
        }
      });
  }

  addTranslate(question: string, answer: string) {
    this.listTranslate = [...this.listTranslate, new Chat(question, answer)];
    this.cdr.detectChanges();
    this.scrollToBottom();
  }

  chatGPTChat() {
    this.payChat('api/gpt/ask');
  }

  geminiChat() {
    this.payChat('api/vertex/gemini/ask');
  }

  palm2Chat() {
    this.freeChat('api/vertex/palm2/ask');
  }

  llamasChat() {
    this.freeChat('api/llm/ask');
  }

  payChat(url: string) {
    this.isLoading = true;
    this.http.post(url, this.params)
      .subscribe({
        next: (res: any) => {
          if (res?.success) {
            this.addMsg(this.params.prompt);
            this.addMsg(res?.data, 'assistant');
            this.addMessage(this.params.prompt, res?.data);
          } else {
            this.addMessage(this.params.prompt, CONSTANT.error);
          }
          this.isLoading = false;
          this.params.prompt = '';
        },
        error: _ => {
          this.toastr.error(CONSTANT.error);
          this.addMessage(this.params.prompt, CONSTANT.error);
          this.isLoading = false;
        }
      });
  }

  freeChat(url: string) {
    this.isLoading = true;
    this.http.post(url, {input: this.params.prompt})
      .subscribe({
        next: (res: any) => {
          this.addMsg(this.params.prompt);
          if (res?.success) {
            this.addMessage(this.params.prompt, res?.data);
            this.addMsg(res?.data, 'assistant');
          } else {
            this.addMessage(this.params.prompt, CONSTANT.error);
            this.addMsg(CONSTANT.error, 'assistant');
          }
          this.params.prompt = '';
          this.isLoading = false;
        },
        error: _ => {
          this.addMsg(this.params.prompt);
          this.addMsg(CONSTANT.error, 'assistant');
          this.toastr.error(CONSTANT.error);
          this.addMessage(this.params.prompt, CONSTANT.error);
          this.isLoading = false;
        }
      });

  }

  toggleChatbot(): void {
    this.isShow = !this.isShow;
  }

  addMessage(question: string, answer: string) {
    this.listChat = [...this.listChat, new Chat(question, answer)];
    this.cdr.detectChanges();
    this.scrollToBottom();
  }

  addMsg(content: string, role: string = 'user') {
    this.params.listMsg = [...this.params.listMsg, new Msg(content, role)];
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
