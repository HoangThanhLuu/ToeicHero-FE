import {
  Component,
  OnInit,
} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements  OnInit {
  listSlider: any = [];

  constructor(private http: HttpClient) {
  }

  images = ['assets/images/carousel-1.jpg', 'assets/images/carousel-4.jpg', 'assets/images/carousel-5.jpg'];

  ngOnInit(): void {
    this.getSlider();
  }

  getSlider(): void {
    this.http.get('api/slider/all')
      .subscribe((res: any) => {
        this.listSlider = res.content;
      });
  }
}
