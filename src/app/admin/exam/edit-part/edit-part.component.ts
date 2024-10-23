import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {NzModalService} from "ng-zorro-antd/modal";
import {BsModalRef} from "ngx-bootstrap/modal";
import {NgxSpinnerService} from "ngx-spinner";
import {ActivatedRoute} from "@angular/router";
import {concatMap} from "rxjs/operators";
import {finalize, from} from "rxjs";
import {AdminLibBaseCss3, AdminStyle2} from "../../admin.style";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-edit-part',
  templateUrl: './edit-part.component.html',
  styleUrls: ['./edit-part.component.scss',
    ...AdminLibBaseCss3,
    ...AdminStyle2,
  ]
})
export class EditPartComponent implements OnInit {
  @Input() title: string = '';
  @Input() currentPart: any;
  @Input() currentExam: any;
  selectedFileAudio: any;
  @Output() editPartSuccess = new EventEmitter();
  titleShow = '';
  param: any = {
    partId: '',
    partAudio: '',
  }

  constructor(private toast: ToastrService,
              private http: HttpClient,
              private modal: NzModalService,
              private bsModalRef: BsModalRef,
              private spinnerService: NgxSpinnerService,
              private translate: TranslateService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.titleShow = `${this.title} - ${this.currentExam?.examName} - ${this.currentPart?.partName}`;
    this.param = {
      partId: this.currentPart?.partId,
      partAudio: this.currentPart?.partAudio,
    }
    this.selectedFileAudio = {name: this.currentPart?.partAudio};
  }

  triggerFileInput(fileInput: any) {
    fileInput.click();
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.selectedFileAudio = files[0];
    } else {
      this.selectedFileAudio = undefined;
    }
  }

  uploadFile(file: File, index: number) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post('/api/upload-file', formData)
      .pipe(
        concatMap((response: any) => {
          return from([response?.data]);
        })
      );
  }

  editPart() {
    if(!(this.selectedFileAudio)) {
      this.toast.error('Vui lòng chọn file audio');
      return;
    }

    this.spinnerService.show();
    this.uploadFile(this.selectedFileAudio, 0)
      .pipe(
        concatMap((url: any) => {
          this.param.partAudio = url;
          return this.http.patch<any>('/api/admin/part/update-part', this.param);
        }),
        finalize(() => this.spinnerService.hide())
      )
      .subscribe((res: any) => {
        if (res?.success) {
          const msg = this.translate.instant(`EXAM.${res?.message}`);
          if (res?.success) {
            this.toast.success(msg);
          } else {
            this.toast.error(msg);
          }
          this.editPartSuccess.emit();
          this.bsModalRef.hide();
        } else {
          const msg = this.translate.instant(`EXAM.${res?.message}`);
          this.toast.error(msg);
        }
      });
  }

  close() {
    this.bsModalRef.hide();
  }
}
