import {
  Component,
  OnInit
} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {NgxSpinnerService} from "ngx-spinner";
import {
  finalize,
  forkJoin
} from "rxjs";

@Component({
  selector: 'app-list-test',
  templateUrl: './list-test.component.html',
  styleUrls: ['./list-test.component.scss']
})
export class ListTestComponent implements OnInit {
  listTopic: any = [];
  currentIndexTopic: number = 0;
  listExam: any = [];

  constructor(private toast: ToastrService,
              private http: HttpClient,
              private spinnerService: NgxSpinnerService) {
  }


  ngOnInit(): void {
    const getListTopicObj = this.http.get('api/topic/list');
    const getListExamObj = this.http.get('api/exam/list');
    this.spinnerService.show();
    forkJoin([getListTopicObj, getListExamObj])
      .pipe(finalize(() => {
        this.spinnerService.hide();
      }))
      .subscribe((res: any) => {
        if (res[0]?.success && res[1]?.success) {
          this.listTopic = res[0]?.data;
          this.listTopic.unshift({
            topicId: 0,
            topicName: 'Tất cả'
          });
          this.listTopic.push({
            topicId: -1,
            topicName: 'Khác'
          });
          this.listExam = res[1]?.data;
        } else {
          this.toast.error(res[0]?.message);
          this.toast.error(res[1]?.message);
        }
      });
  }

  changeTopic(i: number) {
    this.spinnerService.show();
    this.http.get(`/api/exam/list-by-topic/${this.listTopic[i].topicId}`)
      .pipe(finalize(() => {
        this.spinnerService.hide();
      }))
      .subscribe((res: any) => {
        if (res?.success) {
          this.currentIndexTopic = i;
          this.listExam = res?.data;
        } else {
          this.toast.error(res?.message);
        }
      });
  }

  trackByIndexTopic(index: number, item: any): number {
    return item.topicId;
  }

  trackByIndexExam(index: number, item: any): number {
    return item.examId;
  }

  openDetailExam(item: any) {
    window.location.href = `/test/${item.examId}`;
  }
}
