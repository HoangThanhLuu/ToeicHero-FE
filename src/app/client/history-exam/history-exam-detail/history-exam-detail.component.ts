import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {NgxSpinnerService} from "ngx-spinner";
import {finalize} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {DetailAnswerComponent} from "./detail-answer/detail-answer.component";
import {BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-history-exam-detail',
  templateUrl: './history-exam-detail.component.html',
  styleUrls: ['./history-exam-detail.component.scss']
})
export class HistoryExamDetailComponent implements OnInit {
  examHistory: any;
  exam: any;
  listAnswer: any = [];

  constructor(private toast: ToastrService,
              private http: HttpClient,
              private activatedRoute: ActivatedRoute,
              private bsModalService: BsModalService,
              private spinnerService: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const userExamHistoryId = params['userExamHistoryId'];
      if (userExamHistoryId) {
        this.spinnerService.show().then(r => r);
        this.http.get(`/api/exam-history/my-detail/${userExamHistoryId}`)
          .pipe(finalize(() => this.spinnerService.hide()))
          .subscribe((res: any) => {
            if (res?.success) {
              this.exam = res?.data?.exam;
              this.examHistory = res?.data;
              this.listAnswer = res?.data?.userAnswers;
            }
          });
      }
    });
  }
  detail(data: any) {
    this.bsModalService.show(DetailAnswerComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Update Firebase ',
       params : {
         questionNumber: data.question.questionNumber,
         questionAudio: data?.question?.questionAudio,
         questionImage: data?.question?.questionImage,
         paragraph1: data?.question?.paragraph1,
         paragraph2: data?.question?.paragraph2,
         questionContent: data?.question?.questionContent,
         answerA: data?.question?.answerA,
         answerB: data?.question?.answerB,
         answerD: data?.question?.answerD,
         answerC: data?.question?.answerC,
         selectedAnswer: data?.selectedAnswer,
         correctAnswer: data?.question?.correctAnswer,
         transcript: data?.question?.transcript,
         translateTranscript: data?.question?.translateTranscript,

       }
      }
    });
  }
  formatTimeFromSeconds(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  protected readonly Number = Number;
}
