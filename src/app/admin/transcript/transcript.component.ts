import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {BsModalRef} from "ngx-bootstrap/modal";
import {CONSTANT} from "../../common/constant";
import {TranslateService} from "@ngx-translate/core";
import {
  AdminLibBaseCss2,
  AdminStyle
} from "../admin.style";

@Component({
  selector: 'app-transcript',
  templateUrl: './transcript.component.html',
  styleUrls: ['./transcript.component.scss', ...AdminLibBaseCss2, ...AdminStyle]
})
export class TranscriptComponent implements OnInit {
  @Input() title: string = "Transcript";
  isShow: boolean = false;
  fileSrc: string | undefined = "";
  formData = new FormData();
  param: any = {
    name: '',
    model: 'Rev AI',
  };
  models: string[] = ['Google', 'Rev AI'];
  showBorderError: boolean = false;
  list: any = [];
  formatDate = CONSTANT.formatDate;
  timeZone = CONSTANT.timeZone;
  pagination = {
    page: 1,
    pageSize: 10,
    total: 0
  };

  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private spinnerService: NgxSpinnerService,
              private translate: TranslateService,
              private bsModalRef: BsModalRef) {
  }

  ngOnInit(): void {
    this.getListTranscript();
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    this.handleFiles(file);
  }

  close() {
    this.bsModalRef.hide();
  }

  handleFiles(file: any) {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.isShow = true;
        this.fileSrc = `${e.target?.result}`;
        this.formData.delete('file');
        this.formData.append('file', file);
      };
      reader.readAsDataURL(file);
    } else {
      this.isShow = false;
      this.fileSrc = "";
    }
  }

  allowDrop(event: any) {
    event.preventDefault();
  }

  handleDrop(event: any) {
    event.preventDefault();
    const files = event.dataTransfer.files[0];
    this.handleFiles(files);
  }

  changeModel($event: any) {
    this.param.model = $event;
  }

  getTranscript() {
    if (this.param.name === '') {
      this.showBorderError = true;
      this.toastr.error();
      return;
    }
    if (this.formData.get('file') === null) {
      this.toastr.error();
      return;
    }
    this.spinnerService.show().then();
    const url = `/api/transcript/get/${this.param.model === 'Google' ? 'google' : 'revai'}`;
    this.formData.append('name', this.param.name);
    this.http.post(url, this.formData)
      .subscribe({
        next: (res: any) => {
          this.spinnerService.hide().then();
          const msg = this.translate.instant(`TRANSCRIPT.${res?.message}`);
          if (res?.success) {
            // reset form
            this.formData.delete('file');
            this.formData.delete('name');
            this.isShow = false;
            this.fileSrc = "";

            this.getListTranscript();
            this.toastr.success(msg);
            this.bsModalRef.hide();
          } else {
            this.toastr.error(msg);
          }
        },
        error: () => {
          this.spinnerService.hide().then();
          this.toastr.error('TRANSCRIPT.ERROR_GET_TRANSCRIPT');
        }
      });
  }

  getListTranscript() {
    const url = `/api/transcript/history?size=${this.pagination.pageSize}&page=${this.pagination.page - 1}`;
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
    this.pagination.pageSize = $event;
    this.getListTranscript();
  }

  download(id: any) {

  }

  view(id: any) {

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
}


