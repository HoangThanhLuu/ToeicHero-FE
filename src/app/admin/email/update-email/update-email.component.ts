import {Component, Input} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {BsModalRef} from "ngx-bootstrap/modal";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.component.html',
  styleUrls: ['./update-email.component.scss']
})
export class UpdateEmailComponent {

  @Input() title: string = "Thêm Email: ";
  @Input() isAdd = true;
  @Input() params: any = {
    host: '',
    port: '',
    email: '',
    password:''
  };

  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private spinnerService: NgxSpinnerService,
              private bsModalRef: BsModalRef,
              private translate: TranslateService) {
  }

  ngOnInit() {
  }

  close() {
    this.bsModalRef.hide();
  }
  addAccount(): void {
    this.spinnerService.show();
    this.http.post('/api/email/config/update', {host: this.params.host, port: this.params.port, email: this.params.email, password: this.params.password})
      .subscribe({
        next: (res: any) => {
          const msg = this.translate.instant(`EMAIL.${res?.message}`);
          this.toastr.success(msg);
          this.spinnerService.hide();
        },
        error: (res: any) => {
          const msg = this.translate.instant(`EMAIL.${res?.message}`);
          this.spinnerService.hide();
        }
      })
  }
}
