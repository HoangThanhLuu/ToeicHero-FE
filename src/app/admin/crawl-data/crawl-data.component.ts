import {Component, numberAttribute, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {BsModalRef} from "ngx-bootstrap/modal";
import {TranslateService} from "@ngx-translate/core";
import {AdminLibBaseCss2, AdminStyle} from "../admin.style";
import {CONSTANT} from "../../common/constant";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-crawl-data',
  templateUrl: './crawl-data.component.html',
  styleUrls: ['./crawl-data.component.scss', ...AdminLibBaseCss2, ...AdminStyle]
})
export class CrawlDataComponent implements OnInit {
  title: string = "Crawl Data";
  currentPage: string = "Crawl Data";
  listStatus = [
    {
      value: 'ALL',
      label: 'Tất cả'
    },
    {
      value: 'DONE',
      label: 'Hoàn thành'
    },
    {
      value: 'IN_PROGRESS',
      label: 'Đang xử lý'
    },
    {
      value: 'FAILED',
      label: 'Thất bại'
    }
  ];
  params: any = {
    page: 1,
    size: 10,
    status: 'ALL',
    dateFrom: '',
    dateTo: ''
  };
  totalElements = 0;
  listCrawl: any = [];
  formatDate = CONSTANT.formatDate;
  timeZone = CONSTANT.timeZone;
  formatDate2 = 'dd-MM-yyyy';
  maxDate: Date = new Date();
  rangeDate: Array<Date> = [new Date(new Date().setDate(new Date().getDate() - 7)), new Date()];


  constructor(private http: HttpClient,) {
  }

  getListCrawl() {
    this.http.get(`/api/admin/crawl/all-job?page=${this.params.page - 1}&size=${this.params.size}&status=${this.params.status}&dateFrom=${this.params.dateFrom}&dateTo=${this.params.dateTo}`)
      .subscribe((res: any) => {
        this.listCrawl = res.content;
        this.totalElements = res.totalElements;
      });
  }

  ngOnInit(): void {
    this.getListCrawl();
  }

  onChange(event: any) {
    this.params.size = 10;
    this.params.page = 1;
    this.params.status = event;
    this.getListCrawl();
  }

  changePage(event: number) {
    this.params.page = event;
    this.getListCrawl();
  }

  changeSize(event: number) {
    this.params.size = event;
    this.params.page = 1;
    this.getListCrawl();
  }

  onChangeDate(date: any) {
    this.params.dateFrom = this.getFormatDate(date[0], this.formatDate2);
    this.params.dateTo = this.getFormatDate(date[1], this.formatDate2);
    this.getListCrawl();
  }

  getFormatDate(value: Date, formatString: string) {
    return new DatePipe('en_US').transform(value, formatString, this.timeZone);
  }

  protected readonly JSON = JSON;
}
