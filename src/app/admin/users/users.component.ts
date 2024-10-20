import {Component, OnInit} from '@angular/core';
import {AdminLibBaseCss2, AdminStyle} from "../admin.style";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css',
    ...AdminLibBaseCss2,
    ...AdminStyle
  ]
})
export class UsersComponent implements OnInit {

  selectedState: string = 'In Active';
  showOptions: boolean = false;
  currentStateClass: string = '';

  listUser: any = [];
  title = 'Quản lý tài khoản';
  currentPage = 'Tài khoản';

  constructor(private toast: ToastrService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get("/api/admin/user/list")
      .subscribe((res: any) => {
        if (res?.success) {
          this.listUser = res?.data;
        }
      });
  }

  toggleDropdown() {
    this.showOptions = !this.showOptions;
  }

  changeState(userId: any, status: string) {
    this.http.post("/api/admin/user/update-user", {id: userId, status: status})
      .subscribe((res: any) => {
        if (res.success == true) {
          this.toast.success('Cập nhật thành công');
          const indexUser = this.listUser.findIndex((item: any) => item.userId == userId);
          this.listUser[indexUser].status = status;
        } else {
          this.toast.error('Cập nhật thất bại');
        }
      });
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
