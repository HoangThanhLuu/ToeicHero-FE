import {Component, OnInit} from '@angular/core';
import {
  NzTableCellDirective,
  NzTableComponent,
  NzTbodyComponent,
  NzTheadComponent,
  NzThMeasureDirective, NzTrDirective
} from "ng-zorro-antd/table";
import {PageHeaderComponent} from "../../page-header/page-header.component";
import {BsModalService} from "ngx-bootstrap/modal";
import {HttpClient} from "@angular/common/http";
import {NzModalService} from "ng-zorro-antd/modal";
import {NgxSpinnerService} from "ngx-spinner";
import {TranslateService} from "@ngx-translate/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {finalize} from "rxjs";
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
  title: string = 'Detail Statics';
  currentPage: string = 'Detail Statics';
  detail: any;
  timezone: string = CONSTANT.timeZone;

  constructor(
    private bsModalService: BsModalService,
    private http: HttpClient,
    private modal: NzModalService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastrService) {
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
