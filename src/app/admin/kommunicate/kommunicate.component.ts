import {Component, OnInit} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {HttpClient} from '@angular/common/http';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {UpdateKommunicateComponent} from './update-kommunicate/update-kommunicate.component';
import {finalize} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {ScrollService} from "../../common/scroll.service";
@Component({
  selector: 'app-kommunicate',
  templateUrl: './kommunicate.component.html',
  styleUrls: ['./kommunicate.component.scss']
})
export class KommunicateComponent implements OnInit{
  title: string = 'Manage account Kommunicate';
  currentPage: string = 'Kommunicate';
  listKommunicate: any = [];

  constructor(
    private bsModalService: BsModalService,
    private http: HttpClient,
    private modal: NzModalService,
    private spinner: NgxSpinnerService,
    private  translate: TranslateService,
    private toast: ToastrService,
    private scrollService: ScrollService
  ) {
  }
  ngOnInit(): void {
    this.getListKommunicate();
    this.scrollService.scrollToTop();
  }
  getListKommunicate() {
    this.http.get('/api/kommunicate/account/all')
      .subscribe((res: any) => {
        this.listKommunicate = res;
      });
  }
  deleteKommunicate(id: number): void {

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
            this.http.delete(`/api/kommunicate/account/delete/${id}`)
              .pipe(
                finalize(() => {
                  this.getListKommunicate();
                })
              )
              .subscribe({
                next: (res: any) => {
                  const msg = this.translate.instant(`KOMMUNICATE.${res?.message}`);
                  this.toast.success(msg);
                  this.spinner.hide().then();
                  confirmModal.destroy();
                },
                error: (res: any) => {
                  const msg = this.translate.instant(`KOMMUNICATE.${res?.message}`);
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
    const bsModalResult = this.bsModalService.show(UpdateKommunicateComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Update Kommunicate Account ',
        isAdd: false,
        isPopup: true,
        param: {
          email: data.email,
          password: data.password
        }
      }
    });
    if (bsModalResult?.content?.added){
      bsModalResult.content.added.subscribe(() => {
        this.getListKommunicate();
      });
    }
  }
  openFormAdd() {
    const bsModalRef = this.bsModalService.show(UpdateKommunicateComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Add Kommunicate',
        isPopup: true
      }
    });
    if (bsModalRef?.content) {
      bsModalRef.content.addSuccessEmit.subscribe(() => {
        this.getListKommunicate();
      });
    }
  }
}
