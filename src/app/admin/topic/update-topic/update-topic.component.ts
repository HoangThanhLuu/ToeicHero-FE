import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {BsModalRef} from "ngx-bootstrap/modal";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-update-topic',
  templateUrl: './update-topic.component.html',
  styleUrls: ['./update-topic.component.scss']
})
export class UpdateTopicComponent {
  @Input() title: string = "Update Topic: ";
  @Input() isShowImage: boolean = false;
  @Input() imageSrc: string | undefined = "";
  @Input() isPopup: boolean = false;
  @Output() modified = new EventEmitter();
  formData = new FormData();
  showBorderError: boolean = false;
  @Input() params = {
    topicName: '',
    topicId: ''
  }

  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private spinnerService: NgxSpinnerService,
              private bsModalRef: BsModalRef,
              private translate: TranslateService,
  ) {
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
        // clear old file
        this.formData.delete('file');
        // add new file
        this.formData.append('file', file);
      };
      reader.readAsDataURL(file);
    }
  }
  deleteImg() {
    this.formData.delete('file');
    this.isShowImage = false;
    this.imageSrc = '';
  }
  allowDrop(event: any) {
    event.preventDefault();
  }

  handleDrop(event: any) {
    event.preventDefault();
    const files = event.dataTransfer.files[0];
    this.handleFiles(files);
  }
  modifiTopic() {
    this.spinnerService.show();
    this.formData.append('topicName', this.params.topicName);
    this.http.patch(`/api/admin/topic/update/${this.params.topicId}`, this.formData)
      .subscribe({
        next: (res: any) => {
          const msg = this.translate.instant(`TOPIC.${res?.message}`);
          this.toastr.success(msg);
          this.modified.emit();
          this.spinnerService.hide();
          if(this.isPopup){
            this.close();
          }
        },
        error: (res: any) => {
          const msg = this.translate.instant(`TOPIC.${res?.message}`);
          this.spinnerService.hide();
        }
      })
  }
}
