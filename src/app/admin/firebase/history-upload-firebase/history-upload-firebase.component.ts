import {Component, OnInit} from '@angular/core';
import {CONSTANT} from "../../../common/constant";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {TranslateService} from "@ngx-translate/core";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {finalize} from "rxjs";
import {DatePipe} from "@angular/common";
import {AdminLibBaseCss3, AdminStyle2} from "../../admin.style";
import {ScrollService} from "../../../common/scroll.service";

@Component({
  selector: 'app-history-upload-firebase',
  templateUrl: './history-upload-firebase.component.html',
  styleUrls: ['./history-upload-firebase.component.scss', ...AdminLibBaseCss3, ...AdminStyle2]
})
export class HistoryUploadFirebaseComponent implements OnInit {
  title: string = "History Upload Firebase";
  currentPage: string = "History Upload";
  totalElements = 0;
  listUpload: any = [];
  formatDate = CONSTANT.formatDate;
  formatDate2 = 'dd-MM-yyyy';
  timeZone = CONSTANT.timeZone;
  totalSize = 0;
  maxDate: Date = new Date();
  rangeDate: Array<Date> = [new Date(new Date().setDate(new Date().getDate() - 7)), new Date()];

  params: any = {
    page: 1,
    size: 10,
    sort: 'desc',
    type: 'all',
    dateFrom: '',
    dateTo: ''
  };
  listType = [
    {
      value: 'all',
      label: 'All'
    },
    {
      value: 'audio',
      label: 'Audio'
    },
    {
      value: 'image',
      label: 'Image'
    },
  ];
  listSort = [
    {
      value: 'desc',
      label: 'Decrease'
    },
    {
      value: 'asc',
      label: 'Increase'
    }
  ];

  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private spinnerService: NgxSpinnerService,
              private modal: NzModalService,
              private translate: TranslateService,
              private scrollService: ScrollService) {
  }

  ngOnInit(): void {
    this.getListHistoryUpload();
    this.scrollService.scrollToTop();
  }

  getListHistoryUpload() {
    this.http.get(`api/firebase/history/all?page=${this.params.page - 1}&size=${this.params.size}&sort=${this.params.sort}&type=${this.params.type}&dateFrom=${this.params.dateFrom}&dateTo=${this.params.dateTo}&sort=${this.params.sort}`)
      .subscribe((res: any) => {
        this.listUpload = res.data.result.content;
        this.totalElements = res.data.result.totalElements;
        this.totalSize = res.data.totalSize;
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

  isAudio(fileType: string) {
    return fileType.startsWith('audio');
  }

  isImage(fileType: string) {
    return fileType.startsWith('image');
  }

  deleteHistoryUpload(id: number) {
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

  onChangeDate(date: any) {
    this.params.dateFrom = this.getFormatDate(date[0], this.formatDate2);
    this.params.dateTo = this.getFormatDate(date[1], this.formatDate2);
    this.getListHistoryUpload();
  }

  getFormatDate(value: Date, formatString: string) {
    return new DatePipe('en_US').transform(value, formatString, this.timeZone);
  }
}
