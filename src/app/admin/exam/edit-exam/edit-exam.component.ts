import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {BsModalRef} from "ngx-bootstrap/modal";
import {AdminLibBaseCss3, AdminStyle2} from "../../admin.style";

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

  constructor(private http: HttpClient, private toastr: ToastrService, private spinnerService: NgxSpinnerService, private bsModalRef: BsModalRef) {
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
      this.toastr.error('Tên đề thi không được để trống!');
      return;
    }
    this.spinnerService.show();
    this.http.patch('/api/admin/exam/update-exam', this.formModel)
      .subscribe((res: any) => {
        this.spinnerService.hide();
        if (res?.success) {
          this.toastr.success(res?.message);
          this.editSuccessEmit.emit();
          this.bsModalRef.hide();
        } else {
          this.toastr.error(res?.message);
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
