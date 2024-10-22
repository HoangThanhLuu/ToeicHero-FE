import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {BsModalRef} from "ngx-bootstrap/modal";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-update-kommunicate-bot',
  templateUrl: './update-kommunicate-bot.component.html',
  styleUrls: ['./update-kommunicate-bot.component.scss']
})
export class UpdateKommunicateBotComponent implements OnInit {
  title: string = "Quản lý Bot Kommunicate";
  currentPage: string = "Kommunicate";
  @Input() isAdd = true;
  @Input() isPopup: boolean = false;
  @Output() added = new EventEmitter();
  @Output() addSuccessEmit = new EventEmitter();
  @Input() params: any = {
    appId: '',
    apiKey: ''
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
    this.http.post('/api/kommunicate/bot/update', {appId: this.params.appId, apiKey: this.params.apiKey})
      .subscribe({
        next: (res: any) => {
          const msg = this.translate.instant(`KOMMUNICATE.${res?.message}`);
          this.toastr.success(msg);
          this.addSuccessEmit.emit();
          this.added.emit('updateOk');
          this.spinnerService.hide();
          if(this.isPopup) {
            this.close();
          }
        },
        error: (res: any) => {
          const msg = this.translate.instant(`KOMMUNICATE.${res?.message}`);
          this.spinnerService.hide();
        }
      })
  }
}
