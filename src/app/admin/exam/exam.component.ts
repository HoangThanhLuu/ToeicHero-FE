import {Component, OnInit} from '@angular/core';
import {AdminLibBaseCss2, AdminStyle} from "../admin.style";
import {HttpClient} from "@angular/common/http";
import {BsModalService} from "ngx-bootstrap/modal";
import {AddExamComponent} from "./add-exam/add-exam.component";
import {EditExamComponent} from "./edit-exam/edit-exam.component";
import {NgxSpinnerService} from "ngx-spinner";
import {finalize} from "rxjs";
import {CONSTANT} from '../../common/constant';
import {Exam} from '../../common/model/Exam';
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss',
    ...AdminLibBaseCss2,
    ...AdminStyle
  ]
})
export class ExamComponent implements OnInit {
  title: string = "Quản lý đề thi";
  currentPage: string = "Đề thi"
  listExam: Exam[] = [];

  constructor(
    private http: HttpClient,
    private bsModalService: BsModalService,
    private spinnerService: NgxSpinnerService,
    private modal: NzModalService,
    private toast: ToastrService,
    private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.getListExam();
  }

  openFormAdd() {
    const bsModalRef = this.bsModalService.show(AddExamComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Thêm đề thi',
        isPopup: true
      }
    });
    if (bsModalRef?.content) {
      bsModalRef.content.addSuccessEmit.subscribe(() => {
        this.getListExam();
      });
    }
  }


  getListExam() {
    this.spinnerService.show().then();
    this.http.get('/api/admin/exam/list')
      .pipe(finalize(() => {
        this.spinnerService.hide().then();
      }))
      .subscribe((res: any) => {
        if (res?.success) {
          this.listExam = res?.data;
        }
      });
  }

  openDetail(item: any) {
    window.location.href = `/admin/exam/detail?eid=${item.examId}`;
  }

  delete(examId: any) {
    const confirmModal: NzModalRef = this.modal.create({
      nzTitle: `Confirm`,
      nzContent: `Do you want to delete?`,
      nzCentered: true,
      nzFooter: [
        {
          label: 'Cancel',
          onClick: () => confirmModal.destroy()
        }, {
          label: 'Agree',
          type: 'primary',
          onClick: () => {
            this.spinnerService.show().then();
            this.http.delete<any>(`/api/admin/exam/delete-exam/${examId}`)
              .pipe(
                finalize(() => {
                  this.getListExam();
                })
              )
              .subscribe({
                next: (res: any) => {
                  const msg = this.translate.instant(`EXAM.${res?.message}`);
                  this.toast.success(msg);
                  this.spinnerService.hide().then();
                  confirmModal.destroy();
                  console.log('thanh cong',examId);
                },
                error: (res: any) => {
                  const msg = this.translate.instant(`EXAM.${res?.message}`);
                  this.toast.success(msg);
                  this.spinnerService.hide().then();
                  console.log('that bai',examId);
                }
              });
          }
        }
      ]
    });
  }

  openFormEdit(item: any) {
    const bsModalRef = this.bsModalService.show(EditExamComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Sửa đề thi',
        param: {
          examId: item.examId,
          examName: item.examName,
          topicId: item.topic?.topicId,
        }
      }
    });
    if (bsModalRef?.content) {
      bsModalRef.content.editSuccessEmit.subscribe(() => {
        this.getListExam();
      });
    }
  }

  protected readonly CONSTANT = CONSTANT;
}

