import { Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {
  title: string = "Quản lý slider";
  currentPage: string = "Slider";


  dataSet = [
    {
      image: '1',
      position: 'first',
      action: 'active'
    },
    {
      image: '2',
      position: 'second',
      action: 'active'
    }
  ];
}
