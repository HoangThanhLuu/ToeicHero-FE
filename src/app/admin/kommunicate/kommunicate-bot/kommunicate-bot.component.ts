import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {HttpClient} from "@angular/common/http";
import {NzModalService} from "ng-zorro-antd/modal";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import {UpdateKommunicateComponent} from "../update-kommunicate/update-kommunicate.component";
import {finalize} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {UpdateKommunicateBotComponent} from "./update-kommunicate-bot/update-kommunicate-bot.component";

@Component({
  selector: 'app-kommunicate-bot',
  templateUrl: './kommunicate-bot.component.html',
  styleUrls: ['./kommunicate-bot.component.scss']
})
export class KommunicateBotComponent implements OnInit {
  title: string = "Quản lý Bot Kommunicate";
  currentPage: string = "Kommunicate";
  listKommunicateBot: any = [];
  private botIdToDelete: number | undefined;
  isVisible: boolean =false

  constructor(
    private bsModalService: BsModalService,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private  translate: TranslateService,
    private bsModalRef: BsModalRef
  ) {
  }
  ngOnInit(): void {
    this.getListKommunicateBot();
  }
  getListKommunicateBot() {
    this.http.get('/api/kommunicate/bot/all')
      .subscribe((res: any) => {
        this.listKommunicateBot = res;
      });
  }
  trackByFn(index: number, data: any): any {
    return data.id;
  }
  onSwitchChange(appId: number) {
    this.spinner.show();
    this.http.patch('api/kommunicate/bot/update/status/${appId}', {})
      .pipe(
        finalize(() => {
          this.getListKommunicateBot()
        })
      )
      .subscribe( {
        next: ()  => {
          this.toastr.success('thanh cong');
          this.spinner.hide().then();
        },
        error: () => {
          this.toastr.error('that bai');
          this.spinner.hide().then();
        }
      })
  }
  update(data: any) {
    this.bsModalService.show(UpdateKommunicateBotComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Cập nhật Kommunicate Bot ',
        isAdd: false,
        params: {
          appId: data.appId,
          apiKey: data.apiKey
        }
      },
      backdrop: "static"
    });

  }
  handleOk(): void {
    if (this.botIdToDelete) {
      this.deleteBot(this.botIdToDelete);
    }
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  showConfirm(id: number): void {
    this.botIdToDelete = id;
    this.isVisible = true;
  }
  deleteBot(id: number) :void {
    this.spinner.show().then()
    this.http.delete(`/api/kommunicate/bot/delete/${id}`)
      .pipe(
        finalize(() => {
          this.getListKommunicateBot();
        })
      )
      .subscribe({
        next: (res: any) => {
          const msg = this.translate.instant(`KOMMUNICATE.${res?.message}`);
          this.toastr.success(msg);
          this.spinner.hide().then();
        },
        error: (res: any) => {
          const msg = this.translate.instant(`KOMMUNICATE.${res?.message}`);
          this.toastr.error(msg);
          this.spinner.hide().then();
        }
      });
  }

}


