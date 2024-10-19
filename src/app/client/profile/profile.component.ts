import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {NzModalService} from "ng-zorro-antd/modal";
import {BsModalService} from "ngx-bootstrap/modal";
import {NgxSpinnerService} from "ngx-spinner";
import {GetHeaderService} from "../../common/get-headers/get-header.service";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {UpdateProfileComponent} from "./update-profile/update-profile.component";

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

  openFormEditInfo() {
    this.bsModalService.show(UpdateProfileComponent, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  openFormChangePassword() {
    this.bsModalService.show(ChangePasswordComponent, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  handleFileInput($event: any) {

  }

  triggerFileInput(fileInput: any) {
    fileInput.click();
  }
}
