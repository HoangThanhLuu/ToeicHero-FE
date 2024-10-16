import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {NzModalService} from "ng-zorro-antd/modal";
import {BsModalService} from "ngx-bootstrap/modal";
import {NgxSpinnerService} from "ngx-spinner";
import {GetHeaderService} from "../../common/get-headers/get-header.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser: any;

  constructor(private toast: ToastrService,
              private http: HttpClient,
              private modal: NzModalService,
              private bsModalService: BsModalService,
              private spinnerService: NgxSpinnerService,
              private getHeaderService: GetHeaderService) {
  }

  ngOnInit(): void {
    const headers = this.getHeaderService.getHeaderAuthentication();
    this.http.get('/api/user/get-profile', {
      headers
    })
      .subscribe((res: any) => {
        if (res?.success) {
          this.currentUser = res?.data;
        } else {
          alert(res?.message);
        }
      })
  }

}
