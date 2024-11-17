import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ChartOptions} from 'chart.js';
import {forkJoin} from 'rxjs';

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
  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = ['User standard', 'User vip'];
  public pieChartDatasets = [{
    data: []
  }];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(
    private http: HttpClient,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    const list = this.http.get(`/api/statistic/exam/list`);
    const userChart = this.http.get('api/statistic/user/chart');
    forkJoin([list, userChart]).subscribe((res: any) => {
      if (res[0]?.success) {
        this.listExam = res[0].data;
      }
      if (res[1]?.success) {
        const data = res[1].data.map((item: any) => item.totalUser);

        this.pieChartDatasets = [{
          data: data
        }];
      }
    });
  }

  viewDetai(examId: any) {
    this.router.navigate([`/admin/statistic/exam/${examId}`]).then();
  }
}
