import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  AdminLibBaseCss3,
  AdminStyle2
} from "../../admin.style";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {BsModalRef} from "ngx-bootstrap/modal";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-add-topic',
  templateUrl: './add-topic.component.html',
  styleUrls: ['./add-topic.component.scss',
    ...AdminLibBaseCss3,
    ...AdminStyle2,
  ]
})
export class AddTopicComponent {
  @Input() title: string = "";
  @Output() added = new EventEmitter();
  isShowImage: boolean = false;
  imageSrc: string | undefined = "";
  formData = new FormData();
  param: any = {
    topicName: '',
    topicImage: '',
  };
  showBorderError: boolean = false;

  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private spinnerService: NgxSpinnerService,
              private translate: TranslateService,
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
    if (!this.param.topicName) {
      this.toastr.error('Vui lòng nhập tên bộ đề thi');
      this.showBorderError = true;
      return;
    } else {
      this.showBorderError = false;
    }

    if (!this.formData.has('file')) {
      this.toastr.error('Vui lòng chọn ảnh');
      return;
    }
    this.spinnerService.show().then(r => r);
    this.formData.append('topicName', this.param.topicName);
    this.http.post<any>('/api/admin/topic/create-topic', this.formData)
      .subscribe((res: any) => {
        if (res?.success) {
          const msg = this.translate.instant(`TOPIC.${res?.message}`);
          if (res?.success) {
            this.toastr.success(msg);
          } else {
            this.toastr.error(msg);
          }
          this.added.emit();
          this.bsModalRef.hide();
        } else {
          const msg = this.translate.instant(`TOPIC.${res?.message}`);
          this.toastr.error(msg);
        }
        this.spinnerService.hide().then(r => r);
      });
  }
}
