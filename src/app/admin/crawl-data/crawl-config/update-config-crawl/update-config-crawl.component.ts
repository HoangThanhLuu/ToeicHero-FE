import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {BsModalRef} from "ngx-bootstrap/modal";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-update-config-crawl',
  templateUrl: './update-config-crawl.component.html',
  styleUrls: ['./update-config-crawl.component.scss']
})
export class UpdateConfigCrawlComponent {
  @Input() title: string = 'Thêm tài khoản Config Crawl : ';
  @Input() isAdd = true;
  @Input() isPopup: boolean = false;
  showBorderError: boolean = false;
  @Output() added = new EventEmitter();
  @Output() addSuccessEmit = new EventEmitter();
  @Input() params = {
    id: '',
    token: '',
    email: '',
    agentUser: ''
  };

  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private spinnerService: NgxSpinnerService,
              private bsModalRef: BsModalRef,
              private  translate: TranslateService) {
  }
  addAccount(): void {
    if(!this.params.email) {
      this.toastr.error('Vui lòng nhập Email');
      this.showBorderError = true;
      return;
    }else{
      this.showBorderError = false;
    }
    if(!this.params.token) {
      this.toastr.error('Vui lòng nhập Token');
      this.showBorderError = true;
      return;
    }else{
      this.showBorderError = false;
    }
    this.spinnerService.show();
    this.http.post('/api/admin/crawl/update-config', this.params)
      .subscribe({
        next: (res: any) =>{
          const msg = this.translate.instant(`CRAWL.${res?.message}`);
          this.toastr.success(msg);
          this.added.emit('Ok');
          this.addSuccessEmit.emit();
          this.spinnerService.hide();
          if(this.isPopup) {
            this.close();
          }
        },
        error: (res: any) => {
          const msg = this.translate.instant(`CRAWL.${res?.message}`);
          this.toastr.error(msg);
          this.spinnerService.hide();
        }
      })
  }
  close() {
    this.bsModalRef.hide();
  }
}
