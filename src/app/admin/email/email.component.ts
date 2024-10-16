import { Component } from '@angular/core';
import {BsModalService} from "ngx-bootstrap/modal";
import {HttpClient} from "@angular/common/http";
import {NzModalService} from "ng-zorro-antd/modal";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent {
  title: string = "Quản lý email";
  currentPage: string = "Email";
  listEmail :any =[];

  constructor(
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getListEmail();
  }

  getListEmail() {
    this.http.get('/api/admin/')
      .subscribe((res: any) => {
        this.listEmail = res.data;
      });
  }

}
