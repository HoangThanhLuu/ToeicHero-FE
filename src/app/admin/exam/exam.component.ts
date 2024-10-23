import {Component, OnInit} from '@angular/core';
import {AdminLibBaseCss2, AdminStyle} from "../admin.style";
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {NzModalService} from "ng-zorro-antd/modal";
import {BsModalService} from "ngx-bootstrap/modal";
import {AddExamComponent} from "./add-exam/add-exam.component";
import {EditExamComponent} from "./edit-exam/edit-exam.component";
import {NgxSpinnerService} from "ngx-spinner";
import {finalize} from "rxjs";

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
  listExam: any = [];

  constructor(private toast: ToastrService,
              private http: HttpClient,
              private modal: NzModalService,
              private bsModalService: BsModalService,
              private spinnerService: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.getListExam();
  }

  importFile() {

  }

  openFormAdd() {
    const bsModalRef = this.bsModalService.show(AddExamComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Thêm đề thi'
      }
    });
    if (bsModalRef && bsModalRef.content) {
      bsModalRef.content.addSuccessEmit.subscribe(() => {
        this.getListExam();
      });
    }
  }


  getListExam() {
    this.spinnerService.show();
    this.http.get('/api/admin/exam/list')
      .pipe(finalize(() => {
        this.spinnerService.hide();
      }))
      .subscribe((res: any) => {
        if (res?.success) {
          this.listExam = res?.data;
        }
      });
  }

  trackByFn(index: number, item: any): any {
    return item.examId;
  }

  openDetail(item: any) {
    window.location.href = `/admin/exam/detail?eid=${item.examId}`;
  }

  delete(item: any) {

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
    if (bsModalRef && bsModalRef.content) {
      bsModalRef.content.editSuccessEmit.subscribe(() => {
        this.getListExam();
      });
    }
  }
}
