import {Component, EventEmitter, Input, Output} from '@angular/core';
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
  @Output() added = new EventEmitter();
  isShowImage: boolean = false;
  imageSrc: string | undefined = "";
  formData = new FormData();
  param: any = {
    name: '',
    image: '',
  };
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
        this.isShowImage = true;
        this.imageSrc = `${e.target?.result}`;
        this.formData.append('file', file);
      };
      reader.readAsDataURL(file);
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
  addNew(): void {
    if(!this.param.topicName) {
      this.toastr.error('Vui lòng nhập tên bộ đề thi');
      this.showBorderError = true;
      return;
    }else{
      this.showBorderError = false;
    }

    if (!this.formData.has('file')) {
      this.toastr.error('Vui lòng chọn ảnh');
      return;
    }
    this.spinnerService.show();
    this.http.post<any>('/api/upload-file', this.formData)
      .subscribe((res: any) => {
        if (res?.success) {
          this.param.topicImage = res?.data;
          this.http.post<any>('/api/admin/topic/create-topic', this.param)
            .subscribe((res: any) => {
              if (res?.success) {
                this.toastr.success(res?.message);
                this.added.emit();
                this.bsModalRef.hide();
              } else {
                this.toastr.error(res?.message);
              }
              this.spinnerService.hide();
            });
        } else {
          this.toastr.error(res?.message);
          this.spinnerService.hide();
        }
      });
  }
}


