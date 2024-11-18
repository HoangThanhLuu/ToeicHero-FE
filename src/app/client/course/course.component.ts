import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CourseComponent implements OnInit {
  listData: Category[] = [];

  constructor(private http: HttpClient,
              private router: Router,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.http.get('/api/category-course/all-v2')
      .subscribe({
        next: (res: any) => {
          if (res.success) {
            this.listData = res.data;
          }
        },
        error: () => {
          this.toast.error('Lỗi khi lấy dữ liệu');
        }
      });
  }

  openDetail(courseId: number) {
    this.router.navigate(['/course/course-detail/' + courseId]).then();
  }
}

export interface Category {
  categoryId: number;
  name: string;
  courses: Course[];
}

export interface Course {
  courseId: number;
  name: string;
  thumbnail: string;
  price: number;
  discount: number;
  priceSale: string;
  numberMember: number;
}
