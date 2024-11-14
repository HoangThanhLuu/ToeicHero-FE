import {Component, OnInit} from '@angular/core';
import {AdminLibBaseCss2, AdminStyle} from "../admin.style";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {finalize} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css',
    ...AdminLibBaseCss2,
    ...AdminStyle
  ]
})
export class UsersComponent implements OnInit {
  listUser: any = [];
  title = 'Account Management';
  currentPage = 'Accounts';
  totalElements = 0;
  listStatus = [
    {
      value: 'ALL',
      label: 'All'
    },
    {
      value: 'ACTIVE',
      label: 'Active'
    },
    {
      value: 'INACTIVE',
      label: 'Inactive'
    },
    {
      value: 'BLOCKED',
      label: 'Blocked'
    }
  ];
  params: any = {
    userId: '',
    page: 1,
    size: 10,
    status: 'ALL',
  };

  constructor(private toast: ToastrService,
              private http: HttpClient,
              private spinner: NgxSpinnerService,
              ) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.http.get(`/api/admin/user/list?page=${this.params.page - 1}&size=${this.params.size}&status=${this.params.status}`)
      .subscribe((res: any) => {
        this.listUser = res?.content;
        this.totalElements = res?.totalElements;
      });
  }

  changeState(userId: number,status: string){
    this.spinner.show();
    this.http.post('/api/admin/user/update-user', {userId: userId, status: status})
      .pipe(
        finalize(() => {
          this.getUser();
        })
      )
      .subscribe( {
        next: (res: any)  => {
          this.toast.success('Cập nhật thành công');
          const indexUser = this.listUser.findIndex((item: any) => item.user_id == userId);
          this.listUser[indexUser].status = status;
          this.spinner.hide().then();
        },
        error: (res: any) => {
          this.toast.error('Cập nhật thất bại');
          this.spinner.hide().then();
        }
      })
  }
  changePage(event: number) {
    this.params.page = event;
    this.getUser();
  }

  changeSize(event: number) {
    this.params.size = event;
    this.params.page = 1;
    this.getUser();
  }
  onChange(event: any) {
    this.params.size = 10;
    this.params.page = 1;
    this.params.status = event;
    this.getUser();
  }
  getCssStatus(item: any) {
    switch (item) {
      case 'BLOCKED':
        return 'danger';
      case 'INACTIVE':
        return 'warning';
      default:
        return 'success';
    }
  }
}
