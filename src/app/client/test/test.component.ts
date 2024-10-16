import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {NzModalService} from "ng-zorro-antd/modal";
import {BsModalService} from "ngx-bootstrap/modal";
import {NgxSpinnerService} from "ngx-spinner";
import {GetHeaderService} from "../../common/get-headers/get-header.service";
import {ActivatedRoute} from "@angular/router";
import {finalize} from "rxjs";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  currentExam: any;
  listQuestion: any = [];

  constructor(private toast: ToastrService,
              private http: HttpClient,
              private modal: NzModalService,
              private bsModalService: BsModalService,
              private spinnerService: NgxSpinnerService,
              private getHeaderService: GetHeaderService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // get exam from url
    this.spinnerService.show();
    this.route.params.subscribe(params => {
      const examId = params['examId'];
      this.http.get(`/api/exam/find-by-id/${examId}`)
        .pipe(finalize(() => {
          this.spinnerService.hide();
        }))
        .subscribe((res: any) => {
          if (res?.success) {
            this.currentExam = res?.data;
            this.listQuestion = this.currentExam?.listQuestion;
          } else {
            this.toast.error(res?.message);
          }
        });
    });


  }

}
