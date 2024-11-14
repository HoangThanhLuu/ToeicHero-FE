import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {BsModalRef} from "ngx-bootstrap/modal";
import {TranslateService} from "@ngx-translate/core";
import {ScrollService} from "../../../../common/scroll.service";

@Component({
  selector: 'app-update-kommunicate-bot',
  templateUrl: './update-kommunicate-bot.component.html',
  styleUrls: ['./update-kommunicate-bot.component.scss']
})
export class UpdateKommunicateBotComponent implements OnInit{
  title: string = "Quản lý Bot Kommunicate";
  currentPage: string = "Kommunicate";
  showBorderError: any = [];
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
              private translate: TranslateService,
              private scrollService: ScrollService) {
  }

  ngOnInit(): void {
    this.scrollService.scrollToTop();
    }

  close() {
    this.bsModalRef.hide();
  }

  addAccount(): void {
    if (!this.params.appId) {
      this.toastr.error('Vui lòng nhập AppId');
      this.showBorderError[0] = true;
      return;
    } else {
      this.showBorderError[0] = false;
    }
    if (!this.params.apiKey) {
      this.toastr.error('Vui lòng nhập APIKey');
      this.showBorderError[1] = true;
      return;
    } else {
      this.showBorderError[1] = false;
    }
    this.spinnerService.show();
    this.http.post('/api/kommunicate/bot/update', this.params)
      .subscribe({
        next: (res: any) => {
          const msg = this.translate.instant(`KOMMUNICATE.${res?.message}`);
          this.toastr.success(msg);
          this.addSuccessEmit.emit();
          this.added.emit('updateOk');
          this.spinnerService.hide();
          this.params = {
            appId: '',
            apiKey: ''
          };
          if (this.isPopup) {
            this.close();
          }
        },
        error: (res: any) => {
          const msg = this.translate.instant(`KOMMUNICATE.${res?.message}`);
          this.spinnerService.hide().then();
          this.toastr.error(msg);
        }
      })
  }
}
