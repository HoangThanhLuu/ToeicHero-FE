import {Component, OnInit} from '@angular/core';
import {AdminLibBaseCss2, AdminStyle} from "../admin.style";
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {NzModalService} from "ng-zorro-antd/modal";
import {BsModalService} from "ngx-bootstrap/modal";
import {AddExamComponent} from "./add-exam/add-exam.component";

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss',
    ...AdminLibBaseCss2,
    ...AdminStyle
  ]
})
export class ExamComponent implements OnInit{
  title: string = "Quản lý đề thi";
  currentPage: string = "Đề thi"
  listExam: any = [];
  constructor(private toast: ToastrService,
              private http: HttpClient,
              private modal: NzModalService,
              private bsModalService: BsModalService) {
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
    if(bsModalRef && bsModalRef.content) {
      bsModalRef.content.addSuccessEmit.subscribe(() => {
        this.getListExam();
      });
    }
  }


  private getListExam() {
    this.http.get('/api/admin/exam/list')
      .subscribe((res: any) => {
        if(res?.success) {
          this.listExam = res?.data;
        }
      });
  }
  trackByFn(index: number, item: any): any {
    return item.examId;
  }

  openDetail(item: any) {

  }

  delete(item: any) {

  }
}
