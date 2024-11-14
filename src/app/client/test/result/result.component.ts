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
    this.spinnerService.show();
    this.http.get(`/api/exam-history/find-by-id/${this.examHistory}`)
      .pipe(finalize(() => this.spinnerService.hide()))
      .subscribe((res: any) => {
        if (res?.success) {
          this.exam = res?.data?.exam;
          this.examHistory = res?.data;
        }
      });
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
