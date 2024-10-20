import { Component } from '@angular/core';

@Component({
  selector: 'app-crawl-data',
  templateUrl: './crawl-data.component.html',
  styleUrls: ['./crawl-data.component.scss']
})
export class CrawlDataComponent {
  title: string = "Crawl Data";
  currentPage: string = "Crawl Data";

  dataSet = [
    {
      id: '1',
      name: 'ETS 2024 Test 1',
      time:'3/4/2024',
      action: 'active'
    },
    {
      id: '1',
      name: 'ETS 2024 Test 1',
      time:'3/4/2024',
      action: 'active'
    },
    {
      id: '1',
      name: 'ETS 2024 Test 1',
      time:'3/4/2024',
      action: 'active'
    }
  ];
}
