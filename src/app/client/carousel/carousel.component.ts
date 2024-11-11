import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {NgwWowService} from 'ngx-wow';
import {HttpClient} from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnDestroy, OnInit {
  listSlider: any = [];

  constructor(private wowService: NgwWowService,
              private http: HttpClient,) {
    this.wowService.init();
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

  headerCarouselOptions: OwlOptions = {
    autoplay: true,
    smartSpeed: 1500,
    items: 1,
    dots: true,
    loop: true,
    nav: true,
    navText: ['<i class="bi bi-chevron-left"></i>', '<i class="bi bi-chevron-right"></i>'],
  };

  ngOnDestroy(): void {
  }


}
