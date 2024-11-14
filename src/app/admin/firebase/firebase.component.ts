import {Component, OnInit} from '@angular/core';
import { BsModalService} from 'ngx-bootstrap/modal';
import {HttpClient} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {finalize} from 'rxjs';
import {UpdateFirebaseComponent} from './update-firebase/update-firebase.component';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {ScrollService} from "../../common/scroll.service";

@Component({
  selector: 'app-firebase',
  templateUrl: './firebase.component.html',
  styleUrls: ['./firebase.component.scss']
})
export class FirebaseComponent implements OnInit{
  title: string = 'Manage Firebase';
  currentPage: string = 'Firebase';
  listFirebase: any = [];

  constructor(
    private bsModalService: BsModalService,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private modal: NzModalService,
    private  translate: TranslateService,
    private scrollService: ScrollService
  ) {
  }
  ngOnInit(): void {
    this.getListFirebase();
    this.scrollService.scrollToTop();
  }
  getListFirebase() {
    this.http.get('/api/firebase/config/all')
      .subscribe((res: any) => {
        this.listFirebase = res;
      });
  }
  onSwitchChange(id: number) {
    this.spinner.show();
    this.http.patch(`api/firebase/config/update/status/${id}`, {})
      .pipe(
        finalize(() => {
          this.getListFirebase()
        })
      )
      .subscribe( {
        next: (res: any)  => {
          const mgs = this.translate.instant(`FIREBASE.${res?.message}`);
          this.toastr.success(mgs);
          this.spinner.hide().then();
        },
        error: (res: any) => {
          const mgs = this.translate.instant(`FIREBASE.${res?.message}`);
          this.toastr.success(mgs);
          this.spinner.hide().then();
        }
      })
  }
  deleteFirebase(id: number) :void {
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
            this.http.delete(`/api/firebase/config/remove/${id}`)
              .pipe(
                finalize(() => {
                  this.getListFirebase();
                })
              )
              .subscribe({
                next: (res: any) => {
                  const msg = this.translate.instant(`FIREBASE.${res?.message}`);
                  this.toastr.success(msg);
                  this.spinner.hide().then();
                  confirmModal.destroy();
                },
                error: (res: any) => {
                  const msg = this.translate.instant(`FIREBASE.${res?.message}`);
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
    const bsModalRef = this.bsModalService.show(UpdateFirebaseComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Add Firebase',
        isPopup: true
      }
    });
    if (bsModalRef?.content) {
      bsModalRef.content.addSuccessEmit.subscribe(() => {
        this.getListFirebase();
      });
    }
  }
  update(data: any) {
    const bsModalResult = this.bsModalService.show(UpdateFirebaseComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Update Firebase ',
        isAdd: false,
        isPopup: true,
        params: {
          id: data.id,
          tokenKey: data.tokenKey
        }
      }
    });
    if (bsModalResult?.content?.modified){
      bsModalResult.content.modified.subscribe(() => {
        this.getListFirebase();
      });
    }
  }
  protected readonly JSON = JSON;
}
