import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminLibBaseCss3, AdminStyle2} from "../../admin.style";
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
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
  titleShow = '';
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
        .pipe(finalize(() => {
          this.spinnerService.hide();
        }))
        .subscribe((res: any) => {
          if (res?.success && res?.data?.status == 'ACTIVE') {
            this.currentExam = res?.data;
            this.listPart = res?.data?.parts;
            this.title += ` - ${this.currentExam?.examName}`;
          } else {
            this.toast.error('Không tìm thấy đề thi');
          }
        });
    });
  }

  trackByFn(index: number, item: any): any {
    return item.partId;
  }

  openFormEdit(item: any) {

  }

  seeDetail(item: any) {
    window.location.href = `/admin/question/list-by-part?pid=${item?.partId}`;
  }

  importExel(item: any, index: number) {
    this.formData.delete('file');
    this.formData.delete('partId');
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
    } else {
      this.selectedFile = null;
      this.formData.delete('file');
      this.formData.delete('partId');
    }
  }

  deletePart(item: any) {
    const confirmModal: NzModalRef = this.modal.create({
      nzTitle: `Xác nhận`,
      nzContent: `Bạn có muốn chắc chắn muốn  xóa toàn bộ câu hỏi trong part ${item.partName} không?`,
      nzCentered: true,
      nzFooter: [
        {
          label: 'Hủy',
          onClick: () => confirmModal.destroy()
        }, {
          label: 'Đồng ý',
          type: 'primary',
          onClick: () => {
            this.spinnerService.show();
            this.http.delete<any>(`/api/admin/question/delete-all-by-part?partId=${item?.partId}`)
              .pipe(finalize(() => {
                this.spinnerService.hide();
              }))
              .subscribe((res: any) => {
                if (res?.success) {
                  this.toast.success(res?.message);
                } else {
                  this.toast.error(res?.message);
                }
                confirmModal.destroy();
              });
          }
        }
      ]
    });
  }
}
