import {Component, OnInit} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {HttpClient} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {TranslateService} from '@ngx-translate/core';
import {finalize} from 'rxjs';
import {UpdateTinyConfigComponent} from './update-tiny-config/update-tiny-config.component';

@Component({
  selector: 'app-config-tiny',
  templateUrl: './config-tiny.component.html',
  styleUrls: ['./config-tiny.component.scss']
})
export class ConfigTinyComponent implements OnInit{
  title: string = 'Quản lý Config Tiny';
  currentPage: string = 'Config Tiny';
  listConfigTiny: any = [];
  page = 0;
  size = 10;

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
    this.getListConfigTiny(`/api/tiny-config/list?page=${this.page}&size=${this.size}`);
  }
  getListConfigTiny(url: string) {
    this.http.get(url)
        .subscribe((res: any) => {
          this.listConfigTiny = res.content;
        });
  }
  trackByFn(index: number, data: any): any {
    return data.id;
  }
  onSwitchChange(id: number ) {
    this.spinner.show();
    this.http.patch(`api/tiny-config/update/status/${id}`, {})
        .pipe(
            finalize(() => {
              this.getListConfigTiny(`/api/tiny-config/list?page=${this.page}&size=${this.size}`);
            })
        )
        .subscribe( {
          next: (res: any)  => {
            const msg = this.translate.instant(`TINY.${res?.message}`);
            this.toastr.success(msg);
            this.spinner.hide().then();
          },
          error: (res: any) => {
            const msg = this.translate.instant(`TINY.${res?.message}`);
            this.toastr.success(msg);
            this.spinner.hide().then();
          }
        })
  }
  deleteConfifTiny(id: number) :void {
    const confirmModal: NzModalRef = this.modal.create({
      nzTitle: `Xác nhận`,
      nzContent: `Bạn có muốn xóa Config Tiny này không?`,
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
            this.http.delete(`/api/tiny-config/delete/${id}`)
                .pipe(
                    finalize(() => {
                      this.getListConfigTiny(`/api/tiny-config/list?page=${this.page}&size=${this.size}`);
                    })
                )
                .subscribe({
                  next: (res: any) => {
                    const msg = this.translate.instant(`TINY.${res?.message}`);
                    this.toastr.success(msg);
                    this.spinner.hide().then();
                    confirmModal.destroy();
                  },
                  error: (res: any) => {
                    const msg = this.translate.instant(`TINY.${res?.message}`);
                    this.toastr.error(msg);
                    this.spinner.hide().then();
                  }
                });
          }
        }
      ]
    });
  }
  update(data: any) {
    const bsModalResult = this.bsModalService.show(UpdateTinyConfigComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Cập nhật Tiny Config ',
        isAdd: false,
        isPopup: true,
        params: JSON.parse(JSON.stringify(data))
      },
      backdrop: 'static'
    });
    if (bsModalResult?.content?.added){
      bsModalResult.content.added.subscribe(() => {
        this.getListConfigTiny(`/api/tiny-config/list?page=${this.page}&size=${this.size}`);
      });
    }
  }
  openFormAdd() {
    const bsModalRef = this.bsModalService.show(UpdateTinyConfigComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Thêm Config Tiny',
        isPopup: true
      }
    });
    if (bsModalRef && bsModalRef.content) {
      bsModalRef.content.addSuccessEmit.subscribe(() => {
        this.getListConfigTiny(`/api/tiny-config/list?page=${this.page}&size=${this.size}`);
      });
    }
  }
}
