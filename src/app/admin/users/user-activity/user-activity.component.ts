import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgxSpinnerService} from "ngx-spinner";
import {CONSTANT} from "../../../common/constant";
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-user-activity',
  templateUrl: './user-activity.component.html',
  styleUrls: ['./user-activity.component.scss']
})
export class UserActivityComponent implements OnInit {
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

  constructor(private http: HttpClient,
              private spinner: NgxSpinnerService,
              private translate: TranslateService) {
    this.translate.setDefaultLang('en_US');
    this.translate.use('en_US');
  }

  ngOnInit(): void {
    this.getLisActionUser();
  }

  getLisActionUser() {
    this.spinner.show().then();
    this.http.get(`/api/admin/user/activity?page=${this.params.page - 1}&size=${this.params.size}&type=${this.params.type}`)
      .subscribe((res: any) => {
        this.spinner.hide().then();
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

  getJsonFromData(json: any) {
    const obj = JSON.parse(json);
    if (obj) {
      return {
        fullName: obj[0],
        phone: obj[1],
        address: obj[2],
      };
    }
    return {};
  }

  getImage(oldData: any) {
    if (oldData) {
      const json = JSON.parse(oldData);
      if (json) {
        return json[json.length - 1];
      }
    }
    return '';
  }
}
