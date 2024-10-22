import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {BsModalRef} from "ngx-bootstrap/modal";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-update-revai',
  templateUrl: './update-revai.component.html',
  styleUrls: ['./update-revai.component.scss']
})
export class UpdateRevaiComponent {
  @Input() title: string = "Thêm tài khoản REV-AI: ";
  @Input() isAdd = true;
  @Input() isPopup: boolean = false;
  @Output() added = new EventEmitter();
  @Output() addSuccessEmit = new EventEmitter();
  @Input() params: any = {
    email: '',
    password: ''
  };


  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private spinnerService: NgxSpinnerService,
              private bsModalRef: BsModalRef,
              private  translate: TranslateService) {
  }
  addAccount(): void {
    this.spinnerService.show();
    this.http.post('/api/revai/account/update', this.params)
      .subscribe({
        next: (res: any) =>{
          const msg = this.translate.instant(`REVAI.${res?.message}`);
          this.toastr.success(msg);
          this.added.emit('updateOk');
          this.addSuccessEmit.emit();
          this.spinnerService.hide();
          if(this.isPopup) {
            this.close();
          }
        },
        error: (res: any) => {
          const msg = this.translate.instant(`REVAI.${res?.message}`);
          this.toastr.error(msg);
          this.spinnerService.hide();
        }
      })
  }
  close() {
    this.bsModalRef.hide();
  }
}
