import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {NzModalService} from "ng-zorro-antd/modal";
import {BsModalService} from "ngx-bootstrap/modal";
import {NgxSpinnerService} from "ngx-spinner";
import {AuthServiceService} from "../../../auth-service.service";
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

  constructor(private toast: ToastrService,
              private http: HttpClient,
              private modal: NzModalService,
              private bs: BsModalService,
              private bsModalService: BsModalService,
              private spinnerService: NgxSpinnerService,
              private authService: AuthServiceService,
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
      })
  }

  backToListTest() {
    window.location.href = '/list-test';
  }

  formatTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = remainingMinutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
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
