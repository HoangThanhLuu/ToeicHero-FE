import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgxSpinnerService} from "ngx-spinner";
import {ActivatedRoute} from "@angular/router";
import {finalize} from "rxjs";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  examHistory: any;
  exam: any;
  colorLow = '#e2080f';
  colorMedium = '#d9e024';
  colorHigh = '#87d068';

  constructor(private http: HttpClient,
              private spinnerService: NgxSpinnerService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.examHistory = params['resultId'];
      this.getExamHistory();
    })
  }

  private getExamHistory() {
    this.spinnerService.show().then();
    this.http.get(`/api/exam-history/find-by-id/${this.examHistory}`)
      .pipe(finalize(() => this.spinnerService.hide()))
      .subscribe((res: any) => {
        if (res?.success) {
          this.exam = res?.data?.exam;
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

  getColor(percent: number): string {
    if (percent < 50) {
      return this.colorLow;
    } else if (percent >= 50 && percent < 75) {
      return this.colorMedium;
    } else {
      return this.colorHigh;
    }
  }

  backToListTest() {
    window.location.href = '/list-test';
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
