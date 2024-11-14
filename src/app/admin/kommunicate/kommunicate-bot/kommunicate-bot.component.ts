import {Component, OnInit} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {HttpClient} from '@angular/common/http';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {finalize} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {UpdateKommunicateBotComponent} from './update-kommunicate-bot/update-kommunicate-bot.component';

@Component({
  selector: 'app-kommunicate-bot',
  templateUrl: './kommunicate-bot.component.html',
  styleUrls: ['./kommunicate-bot.component.scss']
})
export class KommunicateBotComponent implements OnInit {
  title: string = 'Manage Bot Kommunicate';
  currentPage: string = 'Kommunicate';
  listKommunicateBot: any = [];

  constructor(
    private bsModalService: BsModalService,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private modal: NzModalService,
    private translate: TranslateService,
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
    this.http.patch(`api/kommunicate/bot/update/status/${appId}`, {})
      .pipe(
        finalize(() => {
          this.getListKommunicateBot()
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
          this.toastr.success(msg);
          this.spinner.hide().then();
        }
      })
  }

  update(data: any) {
    const bsModalResult = this.bsModalService.show(UpdateKommunicateBotComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Update Kommunicate Bot ',
        isAdd: false,
        isPopup: true,
        params: {
          appId: data.appId,
          apiKey: data.apiKey
        }
      },
      backdrop: 'static'
    });
    if (bsModalResult?.content?.added) {
      bsModalResult.content.added.subscribe(() => {
        this.getListKommunicateBot();
      });
    }
  }

  deleteBot(id: number): void {
    const confirmModal: NzModalRef = this.modal.create({
      nzTitle: `Confirm`,
      nzContent: `Do you want to delete?`,
      nzCentered: true,
      nzFooter: [
        {
          label: 'Cancel',
          onClick: () => confirmModal.destroy()
        }, {
          label: 'Agree',
          type: 'primary',
          onClick: () => {
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
                  confirmModal.destroy();
                },
                error: (res: any) => {
                  const msg = this.translate.instant(`KOMMUNICATE.${res?.message}`);
                  this.toastr.error(msg);
                  this.spinner.hide().then();
                }
              });
          }
        }
      ]
    });
  }

  openFormAdd() {
    const bsModalRef = this.bsModalService.show(UpdateKommunicateBotComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Add Bot Kommunicate',
        isPopup: true
      }
    });
    if (bsModalRef?.content) {
      bsModalRef.content.addSuccessEmit.subscribe(() => {
        this.getListKommunicateBot();
      });
    }
  }
}


