import {Component, OnInit} from '@angular/core';
import {BsModalService} from "ngx-bootstrap/modal";
import {HttpClient} from "@angular/common/http";
import {NzModalService} from "ng-zorro-antd/modal";
import {NgxSpinnerService} from "ngx-spinner";
import {TranslateService} from "@ngx-translate/core";
import {ToastrService} from "ngx-toastr";
import {CONSTANT} from "../../../common/constant";

@Component({
  selector: 'app-user-activity',
  templateUrl: './user-activity.component.html',
  styleUrls: ['./user-activity.component.scss']
})
export class UserActivityComponent implements OnInit{
  title: string = 'Activity User';
  currentPage: string = 'Activity';
  listAction: any = [];
  totalElements: number = 0;
  formatDate = CONSTANT.formatDate;
  timeZone = CONSTANT.timeZone;
  params: any = {
    page: 1,
    size: 10,
    type: 'ALL'
  };

  constructor(
    private http: HttpClient,
    private modal: NzModalService,
    private spinner: NgxSpinnerService,
    private  translate: TranslateService,
    private toast: ToastrService
  ) {
  }
  ngOnInit(): void {
    this.getLisActionUser();
  }
  getLisActionUser() {
    this.http.get(`/api/admin/user/activity?page=${this.params.page-1}&size=${this.params.size}&type=${this.params.type}`)
      .subscribe((res: any) => {
        this.listAction = res.content;
        this.totalElements = res.totalElements;
      });
  }
  changePage(event: number) {
    this.params.page = event;
    this.getLisActionUser();
  }

  changeSize(event: number) {
    this.params.size = event;
    this.params.page = 1;
    this.getLisActionUser();
  }
  isLastElement(index: number, array: any[]): boolean {
    return index === array.length - 1;
  }
  parsedOldData(oldData: string): string[] {
    return JSON.parse(oldData);
  }
  parsedNewData(newData: string): string[] {
    return JSON.parse(newData);
  }
  protected readonly JSON = JSON;
  protected readonly length = length;
}
