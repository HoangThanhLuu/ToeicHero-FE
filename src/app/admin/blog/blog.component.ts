import {Component, OnInit} from '@angular/core';
import {BsModalService} from "ngx-bootstrap/modal";
import {HttpClient} from "@angular/common/http";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {NgxSpinnerService} from "ngx-spinner";
import {TranslateService} from "@ngx-translate/core";
import {ToastrService} from "ngx-toastr";
import {AddBlogComponent} from "./add-blog/add-blog.component";
import {finalize} from "rxjs";
import {CONSTANT} from "../../common/constant";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit{
  title: string = 'Quản lý Blog';
  currentPage: string = 'Blog';
  listBlog: any = [];
  totalElements = 0;
  formatDate = CONSTANT.formatDate;
  timeZone = CONSTANT.timeZone;
  params: any = {
    page: 1,
    size: 10,
    sort: 'asc'
  };
  listSort = [
    {
      value: 'desc',
      label: 'Giảm dần'
    },
    {
      value: 'asc',
      label: 'Tăng dần'
    }
  ];

  constructor(
    private bsModalService: BsModalService,
    private http: HttpClient,
    private modal: NzModalService,
    private spinner: NgxSpinnerService,
    private  translate: TranslateService,
    private toast: ToastrService
  ) {
  }

  ngOnInit(): void {
       this.getBlog();
    }
  getBlog() {
    this.http.get(`/api/blog/all?page=${this.params.page-1}&size=${this.params.size}&sort=${this.params.sort}`)
      .subscribe((res: any) => {
        this.listBlog = res.content;
        this.totalElements = res.totalElements;
      });
  }
  deleteBlog(id: number) :void {
    const confirmModal: NzModalRef = this.modal.create({
      nzTitle: `Xác nhận`,
      nzContent: `Bạn có muốn xóa Blog này không?`,
      nzCentered: true,
      nzFooter: [
        {
          label: 'Hủy',
          onClick: () => confirmModal.destroy()
        }, {
          label: 'Đồng ý',
          type: 'primary',
          onClick: () => {
            this.spinner.show().then()
            this.http.delete(`/api/blog/delete/${id}`)
              .pipe(
                finalize(() => {
                  this.getBlog();
                })
              )
              .subscribe({
                next: (res: any) => {
                  const msg = this.translate.instant(`BLOG.${res?.message}`);
                  this.toast.success(msg);
                  this.spinner.hide().then();
                  confirmModal.destroy();
                },
                error: (res: any) => {
                  const msg = this.translate.instant(`BLOG.${res?.message}`);
                  this.toast.error(msg);
                  this.spinner.hide().then();
                }
              });
          }
        }
      ]
    });
  }
  changePage(event: number) {
    this.params.page = event;
    this.getBlog();
  }

  changeSize(event: number) {
    this.params.size = event;
    this.params.page = 1;
    this.getBlog();
  }
  openFormAdd() {
    const bsModalRef = this.bsModalService.show(AddBlogComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Thêm Blog',
        isPopup: true
      }
    });
    if (bsModalRef && bsModalRef.content) {
      bsModalRef.content.addSuccessEmit.subscribe(() => {
        this.getBlog();
      });
    }
  }
  update(data: any) {
    const bsModalResult = this.bsModalService.show(AddBlogComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Cập nhật Blog ',
        isAdd: false,
        isPopup: true,
        params: {
          blogId: data.blogId,
          author: data.author,
          content: data.content,
          title: data.title,
          summary: data.summary,
          imageSrc: data.thumbnail,
          isShowImage: true,
        }
      }
    });
    if (bsModalResult?.content?.modified){
      bsModalResult.content.modified.subscribe(() => {
        this.getBlog();
      });
    }
  }
  onChangeSort(event: any) {
    this.params.sort = event;
    this.getBlog();
  }

  protected readonly JSON = JSON;
}