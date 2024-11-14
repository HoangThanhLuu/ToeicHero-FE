import {Component, OnInit} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {HttpClient} from '@angular/common/http';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {NgxSpinnerService} from 'ngx-spinner';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {finalize} from 'rxjs';
import {UpdateRevaiComponent} from './update-revai/update-revai.component';


@Component({
  selector: 'app-rev-ai',
  templateUrl: './rev-ai.component.html',
  styleUrls: ['./rev-ai.component.scss']
})
export class RevAiComponent implements OnInit {
  title: string = 'Manage REV-AI';
  currentPage: string = 'REV-AI';
  listRevai: any = [];

  constructor(
    private bsModalService: BsModalService,
    private http: HttpClient,
    private modal: NzModalService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private toast: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.getListRevai();
  }

  getListRevai() {
    this.http.get('/api/revai/account/all')
      .subscribe((res: any) => {
        this.listRevai = res;
      });
  }

  deleteRevai(id: number): void {
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
            this.http.delete(`/api/revai/account/delete/${id}`)
              .pipe(
                finalize(() => {
                  this.getListRevai();
                })
              )
              .subscribe({
                next: (res: any) => {
                  const msg = this.translate.instant(`REVAI.${res?.message}`);
                  this.toast.success(msg);
                  this.spinner.hide().then();
                  confirmModal.destroy();
                },
                error: (res: any) => {
                  const msg = this.translate.instant(`REVAI.${res?.message}`);
                  this.toast.success(msg);
                  this.spinner.hide().then();
                }
              });
          }
        }
      ]
    });
  }

  update(data: any) {
    const bsModalResult = this.bsModalService.show(UpdateRevaiComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Update account Rev-ai ',
        isAdd: false,
        isPopup: true,
        params: {
          email: data.email,
          password: data.password
        }
      }
    });
    if (bsModalResult?.content?.added) {
      bsModalResult.content.added.subscribe(() => {
        this.getListRevai();
      });
    }
  }

  openFormAdd() {
    const bsModalRef = this.bsModalService.show(UpdateRevaiComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Add Rev-AI',
        isPopup: true
      }
    });
    if (bsModalRef?.content) {
      bsModalRef.content.addSuccessEmit.subscribe(() => {
        this.getListRevai();
      });
    }
  }
}
