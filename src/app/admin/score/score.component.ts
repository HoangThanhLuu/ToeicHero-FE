import { Component } from '@angular/core';
import {BsModalService} from "ngx-bootstrap/modal";
import {HttpClient} from "@angular/common/http";
import {NzModalService} from "ng-zorro-antd/modal";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import {AdminLibBaseCss2, AdminStyle} from "../admin.style";

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss',
    ...AdminLibBaseCss2,
    ...AdminStyle
  ]
})
export class ScoreComponent {
  title: string = "Quản lý tính điểm đề thi";
  currentPage: string = "Tính điểm đề thi";
  listScore: any = [];


  constructor(private bsModalService: BsModalService,
              private http: HttpClient,
              private modal: NzModalService,
              private spinner: NgxSpinnerService,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.getListScore();
  }

  getListScore() {
    this.http.get('/api/admin/score/list')
      .subscribe((res: any) => {
        this.listScore = res.data;
      });
  }
  trackByFn(index: number, item: any): any {
    return item.calculateScoreId;
  }

  editScore(item: any) {

  }
}
