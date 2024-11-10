import {Component, OnInit} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {HttpClient} from '@angular/common/http';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {finalize} from 'rxjs';
import {UpdateEmailComponent} from './update-email/update-email.component';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
  title: string = 'Quản lý email';
  currentPage: string = 'Email';
  listEmailConfig: any = [];

  constructor(
    private bsModalService: BsModalService,
    private http: HttpClient,
    private modal: NzModalService,
    private spinner: NgxSpinnerService,
    private  translate: TranslateService,
    private toast: ToastrService
  ) {
  }
  ngOnInit(): void {
    this.getListEmailConfig();
  }
  getListEmailConfig() {
    this.http.get('/api/email/config/all')
      .subscribe((res: any) => {
        this.listEmailConfig = res;
      });
  }
  deleteEmail(id: number): void {
    const confirmModal: NzModalRef = this.modal.create({
      nzTitle: `Xác nhận`,
      nzContent: `Bạn có muốn xóa slider này không?`,
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
            this.http.delete(`/api/email/config/delete/${id}`)
              .pipe(
                finalize(() => {
                  this.getListEmailConfig();
                })
              )
              .subscribe({
                next: (res: any) => {
                  const msg = this.translate.instant(`EMAIL.${res?.message}`);
                  this.toast.success(msg);
                  this.spinner.hide().then();
                },
                error: (res: any) => {
                  const msg = this.translate.instant(`EMAIL.${res?.message}`);
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
    const bsModalResult = this.bsModalService.show(UpdateEmailComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Cập nhật tài khoản Email ',
        isAdd: false,
        params: {
          host: data.host,
          port: data.port,
          username: data.username,
          password: data.password
        }
      }
    });
    if (bsModalResult?.content?.added){
      bsModalResult.content.added.subscribe(() => {
        this.getListEmailConfig();
      });
    }
  }
  openFormAdd() {
    const bsModalRef = this.bsModalService.show(UpdateEmailComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Thêm Email Config'
      }
    });
    if (bsModalRef && bsModalRef.content) {
      bsModalRef.content.addSuccessEmit.subscribe(() => {
        this.getListEmailConfig();
      });
    }
  }
}
