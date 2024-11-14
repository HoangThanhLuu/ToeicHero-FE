import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgxSpinnerService} from "ngx-spinner";
import {CONSTANT} from "../../../common/constant";
import {AdminLibBaseCss3, AdminStyle2} from "../../admin.style";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-user-activity',
  templateUrl: './user-activity.component.html',
  styleUrls: ['./user-activity.component.scss',...AdminLibBaseCss3, ...AdminStyle2]
})
export class UserActivityComponent implements OnInit {
  title: string = 'Activity User';
  currentPage: string = 'Activity';
  listAction: any = [];
  totalElements: number = 0;
  formatDate = CONSTANT.formatDate;
  formatDate2 = 'dd-MM-yyyy';
  timeZone = CONSTANT.timeZone;
  params: any = {
    page: 1,
    size: 10,
    type: 'ALL',
    dateFrom: '',
    dateTo:''
  };
  listType = [
    {
      value: 'ALL',
      label: 'All'
    },
    {
      value: 'LOGIN',
      label: 'Login'
    },
    {
      value: 'UPDATE_PASSWORD',
      label: 'Update Password'
    },
    {
      value: 'LOGIN_WITH_GOOGLE_FB',
      label: 'Login with Google or Facebook'
    },
    {
      value: 'FORGOT_PASSWORD',
      label: 'Forgot Password'
    },
    {
      value: 'UPDATE_AVATAR',
      label: 'Update Avatar'
    },
    {
      value: 'UPDATE_PROFILE',
      label: 'Update Profile'
    },
    {
      value: 'RESET_PASSWORD',
      label: 'Reset Password'
    },
  ];
  maxDate: Date = new Date();
  rangeDate: Array<Date> = [new Date(new Date().setDate(new Date().getDate() - 7)), new Date()];

  constructor(private http: HttpClient,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.getLisActionUser();
  }

  getLisActionUser() {
    this.spinner.show().then();
    this.http.get(`/api/admin/user/activity?page=${this.params.page - 1}&size=${this.params.size}&type=${this.params.type}&dateFrom=${this.params.dateFrom}&dateTo=${this.params.dateTo}`)
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
  onChangeType($event: any) {
    this.params.type = $event;
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
  onChangeDate(date: any) {
    this.params.dateFrom = this.getFormatDate(date[0], this.formatDate2);
    this.params.dateTo = this.getFormatDate(date[1], this.formatDate2);
    this.getLisActionUser();
  }
  getFormatDate(value: Date, formatString: string) {
    return new DatePipe('en_US').transform(value, formatString, this.timeZone);
  }
}
