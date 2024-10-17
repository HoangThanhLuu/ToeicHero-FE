import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  numbersArray: number[] = [];

  constructor() {
    for (let i = 1; i <= 50; i++) {
      this.numbersArray.push(i);
    }
  }

  submitTest() {
    // Hàm nộp bài
  }


  listQuestion: any[] = [  ];
  listData: any[] = [];

}
