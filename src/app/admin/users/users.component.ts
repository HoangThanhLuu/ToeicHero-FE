import {Component, OnInit} from '@angular/core';
import {AdminLibBaseCss2, AdminStyle} from "../admin.style";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css',
    ...AdminLibBaseCss2,
    ...AdminStyle
  ]
})
export class UsersComponent implements OnInit{

  selectedState: string = 'In Active';
  showOptions: boolean = false;
  currentStateClass: string = '';

  listUser: any = [];
  title = 'Quản lý tài khoản';
  currentPage = 'Tài khoản';

  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {
    this.http.get("/api/admin/user/find-all")
      .subscribe((res: any) => {
         if(res?.success){
           this.listUser = res?.data;
         }
      });
  }

  toggleDropdown() {
    this.showOptions = !this.showOptions;
  }

  changeState(newState: string) {
    this.selectedState = newState;
    this.showOptions = false;
    this.currentStateClass = 'state-' + newState.toLowerCase();
  }

  getCssStatus(item: any) {
    switch (item) {
      case 'BLOCK': return 'danger';
      case 'INACTIVE': return 'warning';
      default: return 'success';
    }
  }


}
