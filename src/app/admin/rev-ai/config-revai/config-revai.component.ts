import {Component, OnInit} from '@angular/core';
import {finalize} from 'rxjs';
import {BsModalService} from 'ngx-bootstrap/modal';
import {HttpClient} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {UpdateConfigComponent} from './update-config/update-config.component';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-config-revai',
  templateUrl: './config-revai.component.html',
  styleUrls: ['./config-revai.component.scss']
})
export class ConfigRevaiComponent implements OnInit{
  title: string = 'Config Rev-Ai';
  currentPage: string = 'Config Rev-Ai';
  listConfig: any = [];

  constructor(
    private bsModalService: BsModalService,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private modal: NzModalService,
    private  translate: TranslateService,

  ) {
  }
  ngOnInit(): void {
    this.getListConfigRevai();
  }
  getListConfigRevai() {
    this.http.get('/api/revai/config/all')
      .subscribe((res: any) => {
        this.listConfig = res;
      });
  }


  onSwitchChange(id: number) {
    this.spinner.show();
    this.http.patch(`api/revai/config/update/status/${id}`, {})
      .pipe(
        finalize(() => {
          this.getListConfigRevai()
        })
      )
      .subscribe( {
        next: (res: any)  => {
          const msg = this.translate.instant(`REVAI.${res?.message}`);
          this.toastr.success(msg);
          this.spinner.hide().then();
        },
        error: (res: any) => {
          const msg = this.translate.instant(`REVAI.${res?.message}`);
          this.toastr.success(msg);
          this.spinner.hide().then();
        }
      })
  }
  update(data: any) {
    const bsModalResult = this.bsModalService.show(UpdateConfigComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Update Config REV-AI ',
        isAdd: false,
        isPopup : true,
        params: {
          id: data.id,
          accessToken: data.accessToken
        }
      },
      backdrop: 'static'

    });
    if (bsModalResult?.content?.added){
      bsModalResult.content.added.subscribe(() => {
        this.getListConfigRevai();
      });
    }
  }
  deleteConfigRev(id: number) :void {
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
            this.http.delete(`/api/revai/config/delete/${id}`)
              .pipe(
                finalize(() => {
                  this.getListConfigRevai();
                })
              )
              .subscribe({
                next: (res: any) => {
                  const msg = this.translate.instant(`REVAI.${res?.message}`);
                  this.toastr.success(msg);
                  this.spinner.hide().then();
                  confirmModal.destroy();
                },
                error: (res: any) => {
                  const msg = this.translate.instant(`REVAI.${res?.message}`);
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
    const bsModalRef = this.bsModalService.show(UpdateConfigComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Add Rev-AI Config',
        isPopup: true
      }
    });
    if (bsModalRef && bsModalRef.content) {
      bsModalRef.content.addSuccessEmit.subscribe(() => {
        this.getListConfigRevai();
      });
    }
  }
}
