import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {NgxSpinnerService} from "ngx-spinner";
import {GetHeaderService} from "../../common/get-headers/get-header.service";
import {finalize} from "rxjs";

@Component({
  selector: 'app-history-exam',
  templateUrl: './history-exam.component.html',
  styleUrls: ['./history-exam.component.scss']
})
export class HistoryExamComponent implements OnInit {
  listMyExam: any = [];

  constructor(private toast: ToastrService,
              private http: HttpClient,
              private spinner: NgxSpinnerService,
              private getHeaderService: GetHeaderService) {
  }

  ngOnInit(): void {
    this.getListMyExam();
  }

  private getListMyExam() {
    this.spinner.show().then(r => r);
    const headers = this.getHeaderService.getHeaderAuthentication();
    this.http.get('/api/exam-history/my-exam', {
      headers
    })
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe((res: any) => {
        if (res?.success) {
          this.listMyExam = res?.data;
        } else {
          this.toast.error('Lấy danh sách bài thi thất bại');
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

  openDetailExam(userExamHistoryId: any) {
    window.location.href = `/my-exam/detail/${userExamHistoryId}`;
  }

  doExamAgain(examId: any) {
    
  }
}