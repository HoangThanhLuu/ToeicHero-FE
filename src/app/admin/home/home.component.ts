import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'
  ]
})
export class HomeComponent implements OnInit {
  title: string = 'Home';
  currentPage: string = 'Home';
  listExam: any;

  constructor(
    private http: HttpClient,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.http.get(`/api/statistic/exam/list`)
      .subscribe((res: any) => {
        this.listExam = res?.data;
      });
  }

  viewDetai(examId: any) {
    this.router.navigate([`/admin/statistic/exam/${examId}`]).then();
  }
}
