import {Component, OnInit} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {HttpClient} from '@angular/common/http';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {NgxSpinnerService} from 'ngx-spinner';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {finalize} from "rxjs";
import {UpdateSliderComponent} from "../slider/update-slider/update-slider.component";
import {UpdateTinyComponent} from "./update-tiny/update-tiny.component";


@Component({
  selector: 'app-tiny',
  templateUrl: './tiny.component.html',
  styleUrls: ['./tiny.component.scss']
})
export class TinyComponent implements OnInit{
  title: string = 'Quản lý tài khoản Tiny';
  currentPage: string = 'Tiny';
  listTiny: any = [];
  page = 0;
  size = 10;
  totalElement = 0;
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
    this.getListTiny(`/api/tiny-account/list?page=${this.page}&size=${this.size}`);
  }

  getListTiny(url: string) {
    this.http.get(url)
      .subscribe((res: any) => {
        this.listTiny = res?.content;
        this.totalElement = res.totalElements;
      });
  }
  deleteTiny(id: string ): void {
    const confirmModal: NzModalRef = this.modal.create({
      nzTitle: `Xác nhận`,
      nzContent: `Bạn có muốn xóa Tiny này không?`,
      nzCentered: true,
      nzFooter: [
        {
          label: 'Hủy',
          onClick: () => confirmModal.destroy()
        }, {
          label: 'Đồng ý',
          type: 'primary',
          onClick: () => {
            this.spinner.show().then();
            this.http.delete<any>(`/api/tiny-account/delete/${id}`)
              .pipe(
                finalize(() => {
                  this.getListTiny(`/api/tiny-account/list?page=${this.page}&size=${this.size}`);
                })
              )
              .subscribe({
                next: (res: any) => {
                  const msg = this.translate.instant(`TINY.${res?.message}`);
                  this.toast.success(msg);
                  this.spinner.hide().then();
                  confirmModal.destroy();
                },
                error: (res: any) => {
                  const msg = this.translate.instant(`TINY.${res?.message}`);
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
    const bsRef = this.bsModalService.show(UpdateTinyComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Cập nhật tài khoản Tiny ',
        isAdd: false,
        isPopup: true,
        params: {
          username: data.username,
          password: data.password
        }
      }
    });
    if (bsRef?.content) {
      bsRef.content.added.subscribe(() => {
        this.getListTiny(`/api/tiny-account/list?page=${this.page}&size=${this.size}`);
      });
    }
  }
  sizeChange(e: any): void {
    this.getListTiny(`/api/tiny-account/list?page=${this.page}&size=${e}`);
  }


  pageIndexChange(e: any) {
    this.getListTiny(`/api/tiny-account/list?page=${e}&size=${this.size}`);
  }
}
