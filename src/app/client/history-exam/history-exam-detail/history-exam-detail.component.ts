import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {NgxSpinnerService} from "ngx-spinner";
import {GetHeaderService} from "../../../common/get-headers/get-header.service";
import {finalize} from "rxjs";
import {ActivatedRoute} from "@angular/router";

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
              private spinnerService: NgxSpinnerService,
              private getHeaderService: GetHeaderService) {
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

  formatTimeFromSeconds(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  protected readonly Number = Number;
}
