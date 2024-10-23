import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {HttpClient} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {finalize} from 'rxjs';
import {UpdateFirebaseComponent} from './update-firebase/update-firebase.component';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {UpdateKommunicateComponent} from "../kommunicate/update-kommunicate/update-kommunicate.component";



@Component({
  selector: 'app-firebase',
  templateUrl: './firebase.component.html',
  styleUrls: ['./firebase.component.scss']
})
export class FirebaseComponent implements OnInit{
  title: string = 'Quản lý tính Firebase';
  currentPage: string = 'Firebase';
  listFirebase: any = [];

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
    this.getListFirebase();
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
      nzTitle: `Xác nhận`,
      nzContent: `Bạn có muốn xóa Firebase này không?`,
      nzCentered: true,
      nzFooter: [
        {
          label: 'Hủy',
          onClick: () => confirmModal.destroy()
        }, {
          label: 'Đồng ý',
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
        title: 'Thêm Firebase',
        isPopup: true
      }
    });
    if (bsModalRef && bsModalRef.content) {
      bsModalRef.content.addSuccessEmit.subscribe(() => {
        this.getListFirebase();
      });
    }
  }
  update(data: any) {
    const bsModalResult = this.bsModalService.show(UpdateFirebaseComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Cập nhật Firebase ',
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
