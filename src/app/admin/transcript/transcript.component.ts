import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-transcript',
  templateUrl: './transcript.component.html',
  styleUrls: ['./transcript.component.scss']
})
export class TranscriptComponent {
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

  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private spinnerService: NgxSpinnerService,
              private bsModalRef: BsModalRef) {
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
      this.toastr.error('Vui lòng nhập tên transcript');
      return;
    }
    if (this.formData.get('file') === null) {
      this.toastr.error('Vui lòng chọn file');
      return;
    }
    this.spinnerService.show().then();
    const url = `/api/transcript/get/${this.param.model === 'Google' ? 'google' : 'revai'}`;
    this.formData.append('name', this.param.name);
    this.http.post(url, this.formData)
      .subscribe({
        next: (res: any) => {
          this.spinnerService.hide().then();
          this.toastr.success('Lấy transcript thành công');
          this.bsModalRef.hide();
        },
        error: (err: any) => {
          this.spinnerService.hide().then();
          this.toastr.error('Lấy transcript thất bại');
        }
      });
  }
}


