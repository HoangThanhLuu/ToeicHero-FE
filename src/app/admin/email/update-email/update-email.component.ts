import {Component, EventEmitter, Input, Output} from '@angular/core';
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
  @Output() added = new EventEmitter();
  @Output() addSuccessEmit = new EventEmitter();
  @Input() params: any = {
    username: '',
    host: '',
    port: '',
    password:''
  };

  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private spinnerService: NgxSpinnerService,
              private bsModalRef: BsModalRef,
              private translate: TranslateService) {
  }

  close() {
    this.bsModalRef.hide();
  }
  addAccount(): void {
    this.spinnerService.show();
    this.http.post('/api/email/config/update', this.params)
      .subscribe({
        next: (res: any) => {
          const msg = this.translate.instant(`EMAIL.${res?.message}`);
          this.toastr.success(msg);
          this.addSuccessEmit.emit();
          this.added.emit('updateOk');
          this.spinnerService.hide();
          this.close()
        },
        error: (res: any) => {
          const msg = this.translate.instant(`EMAIL.${res?.message}`);
          this.spinnerService.hide();
        }
      })
  }
}
