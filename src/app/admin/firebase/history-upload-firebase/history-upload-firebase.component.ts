import {Component, OnInit} from '@angular/core';
import {CONSTANT} from "../../../common/constant";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {BsModalRef} from "ngx-bootstrap/modal";
import {TranslateService} from "@ngx-translate/core";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {finalize} from "rxjs";

@Component({
  selector: 'app-history-upload-firebase',
  templateUrl: './history-upload-firebase.component.html',
  styleUrls: ['./history-upload-firebase.component.scss']
})
export class HistoryUploadFirebaseComponent implements OnInit {
  title: string = "History Upload Firebase";
  currentPage: string = "History Upload";
  totalElements = 0;
  listUpload: any = [];
  formatDate = CONSTANT.formatDate;
  timeZone = CONSTANT.timeZone;
  totalSize = 0;
  params: any = {
    page: 1,
    size: 10,
    sort: 'desc',
    type: 'all'
  };
  listType = [
    {
      value: 'all',
      label: 'Tất cả'
   },
    {
      value: 'audio',
      label: 'Audio'
    },
    {
      value: 'image',
      label: 'Hình ảnh'
    },
  ];
  listSort =[
    {
      value: 'desc',
      label: 'Giảm dần'
    },
    {
      value: 'asc',
      label: 'Tăng dần'
    }
  ]

  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private spinnerService: NgxSpinnerService,
              private modal: NzModalService,
              private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.getListHistoryUpload();
  }

  getListHistoryUpload() {
    this.http.get(`api/firebase/history/all?page=${this.params.page-1}&size=${this.params.size}&sort=${this.params.sort}&type=${this.params.type}`)
      .subscribe((res: any) => {
        this.listUpload = res.data.result.content;
        this.totalElements = res.data.result.totalElements;
        this.totalSize = res. data.totalSize;
      });
  }

  changePage(event: number) {
    this.params.page = event;
    this.getListHistoryUpload();
  }

  changeSize(event: number) {
    this.params.size = event;
    this.params.page = 1;
    this.getListHistoryUpload();
  }
  onChangeType(event: any) {
    this.params.page = 1;
    this.params.size = 10;
    this.params.type = event;
    this.getListHistoryUpload();
  }
  onChangeSort(event: any) {
    this.params.sort = event;
    this.getListHistoryUpload();
  }
  isAudio(fileType: string){
    return fileType.startsWith('audio');
  }

  isImage(fileType: string) {
    return fileType.startsWith('image');
  }
  deleteHistoryUpload(id: number){
    const confirmModal: NzModalRef = this.modal.create({
      nzTitle: `Xác nhận`,
      nzContent: `Bạn có muốn xóa File Upload này không?`,
      nzCentered: true,
      nzFooter: [
        {
          label: 'Hủy',
          onClick: () => confirmModal.destroy()
        }, {
          label: 'Đồng ý',
          type: 'primary',
          onClick: () => {
            this.spinnerService.show();
            this.http.delete(`api/firebase/history/delete/${id}`)
              .pipe(
                finalize(() => {
                  this.getListHistoryUpload();
                })
              )
              .subscribe({
                next: (res: any) => {
                  const msg = this.translate.instant(`FIREBASE.${res?.message}`);
                  this.toastr.success(msg);
                  this.spinnerService.hide().then();
                  confirmModal.destroy();
                },
                error: (res: any) => {
                  const msg = this.translate.instant(`FIREBASE.${res?.message}`);
                  this.toastr.success(msg);
                  this.spinnerService.hide().then();
                }
              });
          }
        }
      ]
    });


  }
}