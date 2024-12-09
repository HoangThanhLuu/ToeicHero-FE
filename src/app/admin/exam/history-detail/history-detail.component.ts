import {Component, OnInit} from '@angular/core';
import {CONSTANT} from '../../../common/constant';
import {ToastrService} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
import {NgxSpinnerService} from 'ngx-spinner';
import {finalize} from 'rxjs';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrl: './history-detail.component.scss'
})
export class HistoryDetailComponent implements OnInit {
  exam: any;
  listAnswer: any = [];
  colorLow = '#e2080f';
  colorMedium = '#d9e024';
  colorHigh = '#87d068';
  timeZone: string = CONSTANT.timeZone;
  examHistory: any = {
    colorListening: this.colorLow,
    colorReading: this.colorLow,
    colorTotal: this.colorLow
  };

  constructor(private toast: ToastrService,
              private http: HttpClient,
              private activatedRoute: ActivatedRoute,
              private bsModalService: BsModalService,
              private spinnerService: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const userExamHistoryId = params['id'];
      if (userExamHistoryId) {
        this.spinnerService.show().then(r => r);
        this.http.get(`/api/exam-history/detail/${userExamHistoryId}`)
          .pipe(finalize(() => this.spinnerService.hide()))
          .subscribe((res: any) => {
            if (res?.success) {
              this.exam = res?.data?.exam;
              this.examHistory = res?.data;
              this.listAnswer = res?.data?.userAnswers;
              const percentListening = Math.floor((Number(res?.data?.totalScoreListening) / 495) * 100);
              const percentReading = Math.floor((Number(res?.data?.totalScoreReading) / 495) * 100);
              const percentTotal = Math.floor((Number(res?.data?.totalScore) / 990) * 100);
              this.examHistory = {
                ...res?.data,
                timeDoExam: this.formatTimeFromSeconds(Number(res?.data?.timeToDoExam) - Number(res?.data?.timeRemaining)),
                percentCorrectAnswer: Math.round((Number(res?.data?.numberOfCorrectAnswer) / Number(res?.data?.totalQuestion)) * 100),
                numberWrongAnswer: Number(res?.data?.numberOfWrongAnswer) - Number(res?.data?.numberOfNotAnswer),
                percentListening,
                percentReading,
                percentTotal,
                colorListening: this.getColor(percentListening),
                colorReading: this.getColor(percentReading),
                colorTotal: this.getColor(percentTotal)
              };
            }
          });
      }
    });
  }

  getColor(percent: number): string {
    if (percent < 50) {
      return this.colorLow;
    } else if (percent >= 50 && percent < 75) {
      return this.colorMedium;
    } else {
      return this.colorHigh;
    }
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
