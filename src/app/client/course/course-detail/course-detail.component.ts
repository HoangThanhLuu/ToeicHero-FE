import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {PopupRegisterComponent} from '../popup-register/popup-register.component';
import {NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent implements OnInit {
  course: Course = new Course();
  currentMonth = new Date();
  priceSave = 0;
  courseParams = {
    topic: 0,
    lesson: 0,
    practice: 0
  };
  sidebarOriginalTop: number = 0;
  isSticky = false;

  constructor(private http: HttpClient,
              private router: Router,
              private modalService: NzModalService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const sidebar = document.getElementById('course-sidebar');
    if (sidebar) {
      this.sidebarOriginalTop = sidebar.offsetTop;
    }
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        const seed = this.hashCode(id);

        // Random cố định với id
        this.courseParams.topic = this.seededRandom(seed, 1, 100);
        this.courseParams.lesson = this.seededRandom(seed + 1, 200, 800); // Thay đổi seed để không trùng số
        this.courseParams.practice = this.seededRandom(seed + 2, 1000, 5000);

        this.http.get('/api/course/detail/' + id)
          .subscribe({
            next: (res: any) => {
              if (res.success) {
                this.course = res.data;
                this.priceSave = this.course.price - this.course.discount;
                this.openPopup();
              }
            }
          });
      } else {
        this.router.navigate(['/course']).then();
      }
    });
  }

  // Hàm hash để tạo seed từ id (tạo một số nguyên từ chuỗi id)
  hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Chuyển thành số nguyên 32 bit
    }
    return Math.abs(hash);
  }

  // Hàm random có seed để đảm bảo giá trị random cố định cho cùng một seed
  seededRandom(seed: number, min: number, max: number): number {
    const random = (Math.sin(seed) * 10000) - Math.floor(Math.sin(seed) * 10000);
    return Math.floor(random * (max - min + 1)) + min;
  }

  openPopup() {
    this.modalService.create({
      nzTitle: `Mua khóa học: ${this.course.name}`,
      nzContent: PopupRegisterComponent,
      nzCentered: true,
      nzDraggable: true,
    });
  }
}


export class Course {
  courseId: number = 0;
  name: string = '';
  thumbnail: string = '';
  price: number = 0;
  discount: number = 0;
  priceSale: string = '';
  numberMember: number = 0;
  courseOverview: string = '';
  courseObjective: string = '';
  courseContent: string = '';
  courseSyllabus: string = '';
  courseReview: string = '';
}
