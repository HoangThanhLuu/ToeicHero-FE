import {Component, Input} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {NgxSpinnerService} from "ngx-spinner";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  @Input() param: any = {
    email: ''
  };

  constructor(
    private bsModalRef: BsModalRef,
    private spinnerService: NgxSpinnerService,
    private http: HttpClient,
    private toastr: ToastrService,
    private  translate: TranslateService) {
  }
  handleClose() {
    this.bsModalRef.hide();
  }

  resetPassword() {
  this.spinnerService.show();
  this.http.post(`api/user/forgot-password`, this.param.email)
    .subscribe({
      next: (res: any) => {
        const msg = this.translate.instant(`USER.${res?.message}`);
        if(res.success){
          this.toastr.success(msg);
        }
        else {
          this.toastr.error(msg);
        }
        this.spinnerService.hide();
      },
      error: (res: any) => {
        const msg = this.translate.instant(`USER.${res?.message}`);
        this.toastr.error(msg);
        this.spinnerService.hide();
    }
    })
  }
}
