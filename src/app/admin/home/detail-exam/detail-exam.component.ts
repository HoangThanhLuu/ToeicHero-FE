import {Component, OnInit} from '@angular/core';
import {
  NzTableCellDirective,
  NzTableComponent,
  NzTbodyComponent,
  NzTheadComponent,
  NzThMeasureDirective, NzTrDirective
} from "ng-zorro-antd/table";
import {PageHeaderComponent} from "../../page-header/page-header.component";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {DatePipe} from "@angular/common";
import {CONSTANT} from "../../../common/constant";

@Component({
  selector: 'app-detail-exam',
  standalone: true,
  imports: [
    NzTableCellDirective,
    NzTableComponent,
    NzTbodyComponent,
    NzThMeasureDirective,
    NzTheadComponent,
    NzTrDirective,
    PageHeaderComponent,
    DatePipe
  ],
  templateUrl: './detail-exam.component.html',
  styleUrl: './detail-exam.component.scss'
})
export class DetailExamComponent implements OnInit {
  title: string = 'Detail Statistic';
  currentPage: string = 'Detail Statistic';
  detail: any;
  timezone: string = CONSTANT.timeZone;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
   ) {
  }

  ngOnInit(): void {
    this.getDetailStatics();
  }

  getDetailStatics() {
    this.route.params.subscribe(params => {
      const examId = params['examId'];
      console.log(examId)
      this.http.get(`/api/statistic/exam/detail?examId=${examId}`)
        .subscribe((res: any) => {
          this.detail = res?.data;
        });
    });
  }
}
