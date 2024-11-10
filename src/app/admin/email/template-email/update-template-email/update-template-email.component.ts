import {
  Component, EventEmitter,
  Input, Output
} from '@angular/core';
import {
  AdminLibBaseCss4,
  AdminStyle3
} from "../../../admin.style";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {BsModalRef} from "ngx-bootstrap/modal";
import {TranslateService} from "@ngx-translate/core";
import {TinyServiceService} from "../../../../common/tiny-service.service";

@Component({
  selector: 'app-update-template-email',
  templateUrl: './update-template-email.component.html',
  styleUrls: ['./update-template-email.component.scss', ...AdminLibBaseCss4, ...AdminStyle3]
})
export class UpdateTemplateEmailComponent {
  @Input() title: string = "Thêm Tempalte-email: ";
  @Input() isAdd = true;
  @Output() added = new EventEmitter();
  tinymceConfig: any;
  @Input() params: any = {
    name: '',
    templateContent: '',
    templateCode: '',
    subject: ''
  };


  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private spinnerService: NgxSpinnerService,
              private bsModalRef: BsModalRef,
              private translate: TranslateService,
              private tinyService: TinyServiceService
              ) {
    this.tinymceConfig = tinyService.getTinyConfig();
  }


  doAction() {
    this.spinnerService.show();
    this.http.post('/api/email/template/update', this.params)
      .subscribe({
        next: (res: any) =>{
          const msg = this.translate.instant(`EMAIL.${res?.message}`);
          this.toastr.success(msg);
          this.added.emit('Ok');
          this.spinnerService.hide();
        },
        error: (res: any) => {
          const msg = this.translate.instant(`EMAIL.${res?.message}`);
          this.spinnerService.hide();
        }
      })
  }
  close() {
    this.bsModalRef.hide();
  }
}
