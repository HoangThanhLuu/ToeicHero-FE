import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminLibBaseCss3, AdminStyle2} from "../../admin.style";
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {NzModalService} from "ng-zorro-antd/modal";
import {BsModalService} from "ngx-bootstrap/modal";
import {ActivatedRoute} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {finalize} from "rxjs";

@Component({
  selector: 'app-exam-detail',
  templateUrl: './exam-detail.component.html',
  styleUrls: ['./exam-detail.component.scss',
    ...AdminLibBaseCss3,
    ...AdminStyle2
  ]
})
export class ExamDetailComponent implements OnInit {
  @ViewChild('fileInput') fileInput: any;
  title = 'Chi tiết đề thi';
  currentPage: string = "Chi tiết đề thi"
  listPart: any = [];
  currentExam: any;
  selectedFile: any;
  selectPart: any;
  formData = new FormData();

  constructor(private toast: ToastrService,
              private http: HttpClient,
              private modal: NzModalService,
              private bsModalService: BsModalService,
              private spinnerService: NgxSpinnerService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.spinnerService.show();
    this.route.queryParams.subscribe((params: any) => {
      this.http.get(`/api/admin/exam/find-by-id?examId=${params?.eid}`)
        .subscribe((res: any) => {
          this.spinnerService.hide();
          if (res?.success && res?.data?.status == 'ACTIVE') {
            this.currentExam = res?.data;
            this.listPart = res?.data?.parts;
          } else {
            this.toast.error('Không tìm thấy đề thi');
          }
        });
    });
  }

  trackByFn(index: number, item: any): any {
    return item.examId;
  }

  openFormEdit(item: any) {

  }

  seeDetail(item: any) {

  }

  importExel(item: any, index: number) {
    this.formData.append('partId', item?.partId);
    this.fileInput.nativeElement.click();
  }

  onFileChange($event: any, item: any) {
    const files = $event.target?.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
      this.formData.append('file', this.selectedFile);
      this.spinnerService.show();
      this.http.post(`/api/admin/question/import-part`, this.formData)
        .pipe(finalize(() => {
          this.spinnerService.hide();
        }))
        .subscribe((res: any) => {
          if (res?.success) {
            this.toast.success('Import thành công');
          } else {
            this.toast.error('Import thất bại');
          }
        });
    }else{
      this.selectedFile = null;
    }
  }
}
