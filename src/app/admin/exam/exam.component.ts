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
  styleUrls: ['./exam.component.css',
    ...AdminLibBaseCss2,
    ...AdminStyle
  ]
})
export class ExamComponent implements OnInit{
  title: string = "Quản lý đề thi";
  currentPage: string = "Đề thi";
  constructor(private toast: ToastrService,
              private http: HttpClient,
              private modal: NzModalService,
              private bsModalService: BsModalService) {
  }
  ngOnInit(): void {
    this.bsModalService.show(AddExamComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Thêm đề thi'
      }
    });
  }
  importFile() {

  }

  openFormAdd() {
    this.bsModalService.show(AddExamComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Thêm đề thi'
      }
    });
  }


}
