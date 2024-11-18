import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-course-payment',
  templateUrl: './course-payment.component.html',
  styleUrl: './course-payment.component.scss'
})
export class CoursePaymentComponent implements OnInit{
  imgSrc = '';
  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get('/api/course/qr-code')
      .subscribe({
        next: (res: any) => {
          if (res.success) {
            this.imgSrc = res.data;
          }
        }
      });
  }
}
