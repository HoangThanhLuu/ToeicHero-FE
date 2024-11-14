import {Component, Input} from '@angular/core';
import {CONSTANT} from '../../common/constant';
import {HttpClient} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
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
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.getListBlog();
  }

  getListBlog() {
    this.spinner.show().then();
    this.http.get(`/api/blog/all?page=${this.params.page - 1}&size=${this.params.size}&sort=${this.params.sort}`)
      .subscribe((res: any) => {
        this.listBlog = res.content;
        this.totalElements = res.totalElements;
        this.spinner.hide().then();
      });
  }

  blogDetail(blogId: any) {
    window.location.href = `/blog/detail-blog/${blogId}`;
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
