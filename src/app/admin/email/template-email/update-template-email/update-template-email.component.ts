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
import {TinyConfig, TinyServiceService} from "../../../../common/tiny-service.service";

@Component({
  selector: 'app-update-template-email',
  templateUrl: './update-template-email.component.html',
  styleUrls: ['./update-template-email.component.scss', ...AdminLibBaseCss4, ...AdminStyle3]
})
export class UpdateTemplateEmailComponent {
  @Input() title: string = "Add Tempalte-email: ";
  @Input() isAdd = true;
  @Output() added = new EventEmitter();
  tinymceConfig: TinyConfig = new TinyConfig();
  @Input() params: any = {
    name: '',
    templateContent: '',
    templateCode: '',
    subject: ''
  };
  apiKeyTiny = '40ku6oculogk4tet8h0si5m7sg4z8qm85i5xl4xxgj0n3y3t';

  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private spinnerService: NgxSpinnerService,
              private bsModalRef: BsModalRef,
              private translate: TranslateService,
              private tinyService: TinyServiceService
              ) {
    this.tinymceConfig = tinyService.getTinyConfig;
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
          this.spinnerService.hide().then();
          this.toastr.error(msg);
        }
      })
  }
  close() {
    this.bsModalRef.hide();
  }
}
