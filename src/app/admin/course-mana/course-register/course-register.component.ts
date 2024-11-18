import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {AdminLibBaseCss3, AdminStyle2} from '../../admin.style';

@Component({
  selector: 'app-course-register',
  templateUrl: './course-register.component.html',
  styleUrls: ['./course-register.component.scss', ...AdminLibBaseCss3, ...AdminStyle2]
})
export class CourseRegisterComponent implements OnInit {
  title: string = "Management Course Register";
  currentPage: string = "Course Register";
  listData: CourseRegister[] = [];
  paging: Paging = new Paging();

  constructor(private http: HttpClient,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.getListData();
  }

  getListData() {
    this.http.get(`/api/course-register/all?page=${this.paging.pageIndex - 1}&size=${this.paging.pageSize}`)
      .subscribe({
        next: (res: any) => {
          this.listData = res.content || [];
          this.paging.total = res.totalElements;
        }
      });
  }

  update(data: CourseRegister) {
    this.http.patch('/api/course-register/confirm/' + data.courseRegisterId, {})
      .subscribe({
        next: (res: any) => {
          if (res.success) {
            this.toast.success('Update success');
            this.getListData();
          } else {
            this.toast.error('Update failed');
          }
        }
      });
  }

  changePage($event: number) {
    this.paging.pageIndex = $event;
    this.getListData();
  }

  changeSize($event: number) {
    this.paging.pageSize = $event;
    this.paging.pageIndex = 1;
    this.getListData();
  }
}


export class CourseRegister {
  courseRegisterId: number = 0;
  name: string = '';
  phone: string = '';
  email: string = '';
  status: boolean = false;
  createdDate: Date = new Date();
}

export class Paging {
  pageIndex: number = 1;
  pageSize: number = 10;
  total: number = 0;
}
