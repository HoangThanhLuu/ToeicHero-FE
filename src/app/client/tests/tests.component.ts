import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrl: './tests.component.scss'
})
export class TestsComponent implements OnInit {
  list: RealTest[] = [];

  constructor(private http: HttpClient, private router: Router, private modal: NzModalService) {
  }

  ngOnInit(): void {
    this.getListTest();
  }

  getListTest() {
    this.http.get('/api/exam/list-real-test')
      .subscribe({
        next: (res: any) => {
          if (res?.success) {
            this.list = res?.data;
          }
        }
      })
  }

  openDetailExam(item: any) {
    const confirmModal = this.modal.confirm({
      nzTitle: 'Bài làm sẽ được bắt đầu khi bạn bấm ok?',
      nzContent: 'Bạn có chắc chắn muốn bắt đầu bài thi này không?',
      nzOnOk: () => {
        this.router.navigate([`/test/${item.examId}/start`]).then();
      }
    });
  }
}


export class RealTest {
  examId: number = 0;
  examName: string = '';
}
