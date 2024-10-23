import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {BsModalRef} from "ngx-bootstrap/modal";
import {AdminLibBaseCss3, AdminStyle2} from "../../admin.style";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-edit-exam',
  templateUrl: './edit-exam.component.html',
  styleUrls: ['./edit-exam.component.scss',
    ...AdminLibBaseCss3,
    ...AdminStyle2,
  ]
})
export class EditExamComponent implements OnInit {
  @Input() title: string = "Add Exam";
  @Output() editSuccessEmit = new EventEmitter();
  listTopic: any = [];
  showBorderError: boolean = false;
  @Input() param: any = {};

  formModel: any = {
    examId: '',
    examName: '',
    topicId: '',
  }

  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private spinnerService: NgxSpinnerService,
              private translate: TranslateService,
              private bsModalRef: BsModalRef) {
  }

  ngOnInit(): void {
    this.formModel = {
      examId: this.param?.examId,
      examName: this.param?.examName,
      topicId: this.param?.topicId,
    }
    this.getListTopic();
  }

  private getListTopic() {
    this.http.get('/api/admin/topic/list')
      .subscribe((res: any) => {
        if (res?.success) {
          this.listTopic = res?.data;
        }
      })
  }

  ediExam() {
    if (!this.formModel.examName) {
      const msg = this.translate.instant(`EXAM.EXAM_NAME_INVALID`);
      this.toastr.error(msg)
      return;
    }
    this.spinnerService.show();
    this.http.patch('/api/admin/exam/update-exam', this.formModel)
      .subscribe((res: any) => {
        this.spinnerService.hide();
        if (res?.success) {
          const msg = this.translate.instant(`EXAM.${res?.message}`);
          if (res?.success) {
            this.toastr.success(msg);
          } else {
            this.toastr.error(msg);
          }
          this.editSuccessEmit.emit();
          this.bsModalRef.hide();
        } else {
          const msg = this.translate.instant(`EXAM.${res?.message}`);
          this.toastr.error(msg);
        }
      });
  }

  cancel() {
    this.bsModalRef.hide();
  }

  updateExamName(event: any) {
    this.formModel.examName = event.target.value;
  }

  onExamTopicChange(event: any) {
    this.formModel.topicId = event.target.value;
  }

  protected readonly top = top;
}
