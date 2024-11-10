import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NzModalService} from "ng-zorro-antd/modal";
import {NgxSpinnerService} from "ngx-spinner";
import {TranslateService} from "@ngx-translate/core";
import {ToastrService} from "ngx-toastr";
import {CONSTANT} from "../../common/constant";
import {Router} from "@angular/router";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit{
  @Input() content: string = '';
  listBlog: any = [];
  formatDate = CONSTANT.formatDate;
  timeZone = CONSTANT.timeZone;
  totalElements: any = 0;
  params: any = {
    page: 1,
    size: 10,
    sort: 'desc'
  };
  constructor(
    private http: HttpClient,
    private modal: NzModalService,
    private spinner: NgxSpinnerService,
    private  translate: TranslateService,
    private router: Router,
    private toast: ToastrService
  ) {
  }

  ngOnInit(): void {
       this.getListBlog();
    }
  getListBlog(){
    this.spinner.show().then();
    this.http.get(`/api/blog/all?page=${this.params.page-1}&size=${this.params.size}&sort=${this.params.sort}`)
      .subscribe((res: any) => {
        this.listBlog = res.content;
        this.totalElements = res.totalElements;
        this.spinner.hide().then();
      });
  }

  blogDetail(blogId: any) {
    window.location.href = `/detail-blog/${blogId}`;
  }
  changePage(event: number) {
    this.params.page = event;
    this.getListBlog();
  }

  changeSize(event: number) {
    this.params.size = event;
    this.params.page = 1;
    this.getListBlog();
  }
}
