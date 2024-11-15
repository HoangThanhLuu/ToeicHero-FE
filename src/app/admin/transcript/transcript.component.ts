import {
  Component,
  Input, OnDestroy, OnInit,
} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
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
export class TranscriptComponent implements OnInit, OnDestroy{
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
  intervalProgress: any;


  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private spinnerService: NgxSpinnerService,
              private translate: TranslateService) {
  }

  ngOnInit(): void {
        this.loadProgress();
    }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    this.handleFiles(file);
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
      this.toastr.error('Name is required');
      return;
    }
    if (this.formData.get('file') === null) {
      this.toastr.error('File is required');
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
            this.toastr.success(msg);
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
  ngOnDestroy(): void {
    clearInterval(this.intervalProgress);
  }
  loadProgress() {
    this.intervalProgress = setInterval(() => {
      this.http.get(`/api/transcript/get`)
        .subscribe({
          next: _ => {
          }
        });
    }, 5_000);
  }
}


