import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {CarouselService} from "ngx-owl-carousel-o/lib/services/carousel.service";
import {NgwWowService} from "ngx-wow";
import {HttpClient} from "@angular/common/http";

declare var $: any;

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements AfterViewInit, OnDestroy, OnInit {
  listSilider: any =[];
  constructor(private wowService: NgwWowService,
              private http: HttpClient,) {
    this.wowService.init();
  }
 // images = ['assets/images/carousel-1.jpg', 'assets/images/carousel-4.jpg', 'assets/images/carousel-5.jpg'];
  ngOnInit(): void {
    this.getSLider();
  }
  getSLider(): void {
    this.http.get('api/slider/all')
      .subscribe( (res: any)=> {
        this.listSilider = res.content;
        console.log(res);
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

  ngAfterViewInit(): void {
    // $('.header-carousel').owlCarousel({
    //   autoplay: true,
    //   smartSpeed: 1500,
    //   items: 1,
    //   dots: false,
    //   loop: true,
    //   nav: true,
    //   navText: ['<i class="bi bi-chevron-left"></i>', '<i class="bi bi-chevron-right"></i>']
    // });
  }

  ngOnDestroy(): void {
  }




}
