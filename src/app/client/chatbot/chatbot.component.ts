import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent {
  isShow: boolean = true;
  showText: boolean = true;
  isChatbot: boolean = true;
  params: any ={
    answer: '',
    question: '',
  };
  chatEntries: any = [
    {
      question: 'Hi',
      answer: 'Can i help u?'
    },
    {
      question: 'You can help me?',
      answer: 'Yes, i can help u'
    },
    {
      question: `
      The ------- at Yohanan Company organizes the delivery of supplies to all conference locations.
      A. coordinating
      B. coordinates
      C. coordinated
      D. coordinator
      `,
      answer: `
      The ------- at Yohanan Company organizes the delivery of supplies to all conference locations.
      A. coordinating
      B. coordinates
      C. coordinated
      D. coordinator
      `
    },
    {
      question: `
      The ------- at Yohanan Company organizes the delivery of supplies to all conference locations.
      A. coordinating
      B. coordinates
      C. coordinated
      D. coordinator
      `,
      answer: `
      The ------- at Yohanan Company organizes the delivery of supplies to all conference locations.
      A. coordinating
      B. coordinates
      C. coordinated
      D. coordinator
      `
    },
    {
      question: `
      The ------- at Yohanan Company organizes the delivery of supplies to all conference locations.
      A. coordinating
      B. coordinates
      C. coordinated
      D. coordinator
      `,
      answer: `
      The ------- at Yohanan Company organizes the delivery of supplies to all conference locations.
      A. coordinating
      B. coordinates
      C. coordinated
      D. coordinator
      `
    },
    {
      question: `
      The ------- at Yohanan Company organizes the delivery of supplies to all conference locations.
      A. coordinating
      B. coordinates
      C. coordinated
      D. coordinator
      `,
      answer: `
      The ------- at Yohanan Company organizes the delivery of supplies to all conference locations.
      A. coordinating
      B. coordinates
      C. coordinated
      D. coordinator
      `
    }
  ];

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) {
  }

  toggleChatbot(): void {
    this.isShow = !this.isShow;
  }
  postQuestion(){
    const currentQuestion = this.params.question;
    this.http.post(`/api/llm/ask`,{question: currentQuestion})
      .subscribe({
        next: (res: any) => {
          if(res?.success) {
            this.chatEntries = [...this.chatEntries, { question: currentQuestion, answer : res.data }];
          } else {
            this.chatEntries = [...this.chatEntries, { question: currentQuestion, answer : 'Đã có lỗi xảy ra. Vui lòng thử lại sau.' }];
          }
        },
        error: (res: any) => {
          this.toastr.error('error')
          this.chatEntries = [...this.chatEntries, { question: currentQuestion, answer: 'Đã có lỗi xảy ra. Vui lòng thử lại sau.' }];
        }
      })
    this.params.question = '';
    this.showText = false;
  }
}
