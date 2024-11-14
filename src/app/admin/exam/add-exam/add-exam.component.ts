import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AdminLibBaseCss3, AdminStyle2} from '../../admin.style';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {TranslateService} from '@ngx-translate/core';
import {bottom} from '@popperjs/core';
import {DatetimeService} from '../../../common/datetime.service';
import {Topic} from '../../../common/model/Topic';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css',
    ...AdminLibBaseCss3,
    ...AdminStyle2,
  ]
})
export class AddExamComponent implements OnInit {
  @Input() title: string = 'Add Exam';
  @Output() addSuccessEmit = new EventEmitter();
  @Input() isPopup: boolean = false;
  listTopic: Topic[] = [];
  selectedFiles: any = [];
  audioParts = Array(5).fill(null);
  showBorderError: boolean[] = Array(10).fill(false);
  param: Param = new Param();
  formData: FormData = new FormData();


  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private spinnerService: NgxSpinnerService,
              private translate: TranslateService,
              private dateService: DatetimeService,
              private bsModalRef: BsModalRef) {
  }

  ngOnInit(): void {
    this.getListTopic();
  }

  getListTopic() {
    this.http.get('/api/admin/topic/all')
      .subscribe((res: any) => {
        if (res?.success) {
          this.listTopic = res?.data;
        }
      })
  }

  clearFormdata() {
    this.formData.delete('examName');
    this.formData.delete('topicId');
    this.formData.delete('isFree');
    this.formData.delete('fromDate');
    this.formData.delete('toDate');
  }

  addNewExam() {
    if (this.validateInput()) {
      this.clearFormdata();
      this.spinnerService.show().then();
      this.formData.append('examName', this.param.examName);
      this.formData.append('topicId', this.param.topicId || '-1');
      this.formData.append('isFree', this.param.isFree);
      if (this.param.isFree === 'false') {
        this.formData.append('fromDate', this.param.fromDate.toISOString().replace('Z', ''));
        this.formData.append('toDate', this.param.toDate.toISOString().replace('Z', ''));
      }
      this.http.post('/api/admin/exam/create-exam', this.formData)
        .subscribe({
          next: (res: any) => {
            this.spinnerService.hide().then();
            if (res?.success) {
              this.toastr.success('', res?.message, {
                titleClass: 'fs-message',
              });
              // clear form
              this.param = new Param();
              this.selectedFiles = [];
              this.formData = new FormData();

              if (this.isPopup) {
                this.addSuccessEmit.emit();
                this.bsModalRef.hide();
              }
            } else {
              this.toastr.error('', this.translate.instant(`res?.message`), {
                titleClass: 'fs-message',
              });
            }
          },
          error: _ => {
            this.spinnerService.hide().then();
            this.toastr.error('', 'Add exam failed', {
              titleClass: 'fs-message',
            });
          }
        });
    }
  }

  validateInput() {
    if (!this.param.examName) {
      const title: string = 'Exam name must not be empty';
      this.toastr.error('', title, {
        titleClass: 'fs-message',
      });
      this.showBorderError[0] = true
      return false;
    } else {
      this.showBorderError[0] = false;
    }
    if (!this.selectedFiles[0]) {
      const title: string = 'Please select file';
      this.toastr.error('', title, {
        titleClass: 'fs-message',
      });
      this.showBorderError[9] = true
      return false;
    } else {
      this.showBorderError[9] = false;
    }
    if (!this.param.isFree) {
      const title: string = 'Select exam free must not be empty';
      this.toastr.error('', title, {
        titleClass: 'fs-message',
      });
      this.showBorderError[1] = true
      return false;
    } else {
      this.showBorderError[1] = false;
    }


    if (this.param.isFree === 'false') {
      if (!this.param.fromDate) {
        const title: string = 'Please select from date';
        this.toastr.error('', title, {
          titleClass: 'fs-message',
        });
        this.showBorderError[2] = true;
        return false;
      } else {
        this.showBorderError[2] = false;
      }

      if (!this.param.toDate) {
        const title: string = 'Please select to date';
        this.toastr.error('', title, {
          titleClass: 'fs-message',
        });
        this.showBorderError[3] = true;
        return false;
      } else {
        this.showBorderError[3] = false;
      }
    }
    return true;
  }

  triggerFileInput(fileInput: any) {
    fileInput.click();
  }

  onFileSelected(event: any, index: number) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.selectedFiles[index] = files[0];
      this.formData.append(`audio${index != 0 ? index : ''}`, this.selectedFiles[index]);
    } else {
      this.selectedFiles[index] = null;
      this.formData.delete(`audio${index != 0 ? index : ''}`);
    }
  }

  cancel() {
    this.bsModalRef.hide();
  }

  onChangeDate($event: Date, type: string) {
    if (type === 'from') {
      this.param.fromDate = $event;
    } else {
      this.param.toDate = $event;
    }
  }

  protected readonly bottom = bottom;
}

export class Param {
  examName: string = '';
  topicId: string = '';
  isFree: string = '';
  fromDate: Date = new Date();
  toDate: Date = new Date();
}
