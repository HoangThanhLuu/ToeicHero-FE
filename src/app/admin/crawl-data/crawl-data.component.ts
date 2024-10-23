import {Component, numberAttribute, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {BsModalRef} from "ngx-bootstrap/modal";
import {TranslateService} from "@ngx-translate/core";
import {AdminLibBaseCss2, AdminStyle} from "../admin.style";
import {CONSTANT} from "../../common/constant";

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
    }
  ];
  params: any = {
    page: 1,
    size: 10,
    status: 'ALL'
  };
  totalElements = 0;
  listCrawl: any = [];
  formatDate = CONSTANT.formatDate;
  timeZone = CONSTANT.timeZone;

  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private spinnerService: NgxSpinnerService,
              private bsModalRef: BsModalRef,
              private translate: TranslateService) {
  }

  getListCrawl() {
    this.http.get(`/api/admin/crawl/all-job?page=${this.params.page - 1}&size=${this.params.size}&status=${this.params.status}`)
      .subscribe((res: any) => {
        this.listCrawl = res.content;
        this.totalElements = res.totalElements;
      });
  }

  ngOnInit(): void {
    this.getListCrawl();
  }

  onChange(event: any) {
    this.params = {
      page: 1,
      size: 10
    };
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
}
