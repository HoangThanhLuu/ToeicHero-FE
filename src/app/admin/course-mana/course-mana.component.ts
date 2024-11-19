import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AdminLibBaseCss2, AdminStyle} from '../admin.style';
import {BsModalService} from 'ngx-bootstrap/modal';
import {CourseUpsertComponent} from './course-upsert/course-upsert.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-course-mana',
  templateUrl: './course-mana.component.html',
  styleUrls: ['./course-mana.component.scss', ...AdminStyle, ...AdminLibBaseCss2]
})
export class CourseManaComponent implements OnInit {
  title: string = 'Management Course';
  currentPage: string = 'Course';
  listData: Course[] = [];

  constructor(private http: HttpClient,
              private toast: ToastrService,
              private router: Router,
              private bsModalService: BsModalService
  ) {
  }

  ngOnInit(): void {
    this.getListData();
  }

  getListData() {
    this.http.get('/api/course/all')
      .subscribe((res: any) => {
        if (res.success) {
          this.listData = res.data;
        } else {
          console.error('Failed to get data');
        }
      });
  }

  openFormAdd() {
    this.router.navigate(['/admin/course-mana/add']).then();
  }

  update(data: Course): void {
    this.bsModalService.show(CourseUpsertComponent, {
      class: 'modal-xl modal-dialog-centered',
      initialState: {
        title: 'Update Course',
        isAdd: false,
        params: {
          courseId: data.courseId,
          name: data.name,
          price: data.price,
          discount: data.discount,
          salePrice: data.priceSale,
          thumbnail: data.thumbnail,
          courseOverview: data.courseOverview,
          courseObjective: data.courseObjective,
          courseContent: data.courseContent,
          courseSyllabus: data.courseSyllabus,
          courseReview: data.courseReview,
          categoryCourseId: data.categoryCourseId
        },
        isShowImage: true,
        imageSrc: data.thumbnail,
      }
    });
  }

  delete(id: any) {
    this.http.delete(`/api/course/delete/${id}`)
      .subscribe({
        next: _ => {
          this.toast.success('Delete course successfully');
          this.getListData();
        },
        error: _ => {
          this.toast.error('Failed to delete course');
        }
      });
  }
}


export class Course {
  courseId: number = -1;
  name: string = '';
  price: number = 0;
  numberMember: number = 0;
  discount: number = 0;
  priceSale: number = 0;
  thumbnail: string = '';
  courseOverview: string = '';
  courseObjective: string = '';
  courseContent: string = '';
  courseSyllabus: string = '';
  courseReview: string = '';
  categoryCourseId: number = -1;
}
