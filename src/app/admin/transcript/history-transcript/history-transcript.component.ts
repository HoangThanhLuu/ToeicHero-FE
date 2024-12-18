import {
  Component,
  Input, OnDestroy,
  OnInit
} from '@angular/core';
import {CONSTANT} from "../../../common/constant";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {TranslateService} from "@ngx-translate/core";
import {
  AdminLibBaseCss3,
  AdminStyle2
} from "../../admin.style";
import {DatePipe} from "@angular/common";
import {TranscriptDetailComponent} from "../transcript-detail/transcript-detail.component";
import {BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-history-transcript',
  templateUrl: './history-transcript.component.html',
  styleUrls: ['./history-transcript.component.scss', ...AdminLibBaseCss3, ...AdminStyle2]
})
export class HistoryTranscriptComponent implements OnInit, OnDestroy {
  @Input() isShowPageHeader: boolean = true;
  title: string = "History transcript";
  currentPage: string = "History transcript";
  list: any = [];
  formatDate = CONSTANT.formatDate;
  formatDate2 = 'dd-MM-yyyy';
  timeZone = CONSTANT.timeZone;
  pagination: any = {
    page: 1,
    size: 10,
    sort: 'desc',
    type: 'all',
    total: 0,
    dateFrom: '',
    dateTo: ''
  };
  listType = [
    {
      value: 'all',
      label: 'All'
    },
    {
      value: 'IN_PROGRESS',
      label: 'In Progress'
    },
    {
      value: 'TRANSCRIBED',
      label: 'Success'
    },
    {
      value: 'FAILED',
      label: 'Failed'
    }
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
  maxDate: Date = new Date();
  rangeDate: Array<Date> = [new Date(new Date().setDate(new Date().getDate() - 7)), new Date()];
  intervalProgress: any;

  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private spinnerService: NgxSpinnerService,
              private translate: TranslateService,
              private bsModal: BsModalService) {
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalProgress);
  }

  ngOnInit(): void {
    this.getListTranscript();
    this.intervalProgress = setInterval(() => {
      this.getListTranscript();
    }, 15_000);
  }

  getListTranscript() {
    const url = `/api/transcript/history?size=${this.pagination.size}&page=${this.pagination.page - 1}&status=${this.pagination.type}&dateFrom=${this.pagination.dateFrom}&dateTo=${this.pagination.dateTo}&sort=${this.pagination.sort}`;
    this.http.get(url)
      .subscribe({
        next: (res: any) => {
          this.list = res?.data?.content;
          this.pagination.total = res?.data?.totalElements;
        },
        error: () => {
          this.toastr.error();
        }
      });
  }

  changePage($event: number) {
    this.pagination.page = $event;
    this.getListTranscript();
  }

  changeSize($event: number) {
    this.pagination.page = 1;
    this.pagination.size = $event;
    this.getListTranscript();
  }

  onChangeType($event: any) {
    this.pagination.type = $event;
    this.pagination.page = 1;
    this.getListTranscript();
  }

  onChangeSort($event: any) {
    this.pagination.sort = $event;
    this.getListTranscript();
  }


  view(data: any) {
    this.bsModal.show(TranscriptDetailComponent, {
      initialState: {
        param: {
          transcript: data.transcriptContent,
          translate: data.transcriptContentTranslate
        }
      },
      class: 'modal-lg modal-dialog-centered modal-dialog-scrollable'
    });
  }

  download(id: number) {

  }

  translateContent(id: number) {
    this.spinnerService.show().then();
    this.http.get(`/api/transcript/translate/${id}`)
      .subscribe({
        next: (res: any) => {
          this.spinnerService.hide().then();
          const msg = this.translate.instant(`TRANSCRIPT.${res?.message}`);
          if (res?.success) {
            this.toastr.success(msg);
            this.getListTranscript();
          } else {
            this.toastr.error(msg);
          }
        },
        error: () => {
          this.spinnerService.hide().then();
          this.toastr.error('TRANSCRIPT.ERROR_TRANSLATE');
        }
      });
  }

  onChangeDate(date: any) {
    this.pagination.dateFrom = this.getFormatDate(date[0], this.formatDate2);
    this.pagination.dateTo = this.getFormatDate(date[1], this.formatDate2);
    this.getListTranscript();
  }

  getFormatDate(value: Date, formatString: string) {
    return new DatePipe('en_US').transform(value, formatString, this.timeZone);
  }

}
