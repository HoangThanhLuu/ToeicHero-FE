import {Component, Input, OnInit} from '@angular/core';
import {finalize} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {NgxSpinnerService} from "ngx-spinner";
import {ActivatedRoute} from "@angular/router";
import {CONSTANT} from "../../../common/constant";

@Component({
  selector: 'app-detail-blog',
  templateUrl: './detail-blog.component.html',
  styleUrls: ['./detail-blog.component.scss']
})
export class DetailBlogComponent implements OnInit{
  @Input() content: string = '';
  @Input() listBlog: any = {};
  formatDate = CONSTANT.formatDate2;
  timeZone = CONSTANT.timeZone;
  detailBlog: any;
  params: any = {
    page: 1,
    size: 10,
    sort: 'desc'
  };
  constructor(private toast: ToastrService,
              private http: HttpClient,
              private spinnerService: NgxSpinnerService,
              private route: ActivatedRoute) {
  }
  ngOnInit(): void {
   this.getDetailBlog();
   this.getListBlog();
  }
  getDetailBlog(){
    this.spinnerService.show();
    this.route.params.subscribe(params => {
      const blogId = params['blogId'];
      this.http.get(`/api/blog/detail/${blogId}`)
        .pipe(finalize(() => {
          this.spinnerService.hide().then();
        }))
        .subscribe((res: any) => {
          if (res?.success) {
            this.detailBlog = res?.data;
          } else {
            this.toast.error(res?.message);
            window.location.href = '/blog';
          }
        });
    });
  }
  getListBlog(){
    this.spinnerService.show().then();
    this.http.get(`/api/blog/all?page=${this.params.page-1}&size=${this.params.size}&sort=${this.params.sort}`)
      .subscribe((res: any) => {
        this.listBlog = res.content;
        this.spinnerService.hide().then();
      });
  }
  blogDetail(blogId: any) {
    window.location.href = `/detail-blog/${blogId}`;
  }
}
