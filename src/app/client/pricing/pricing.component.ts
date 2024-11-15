import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Plan} from '../../common/model/Plan';
import {PlanDetail} from '../../common/model/PlanDetail';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent implements OnInit {
  listPlan: Plan[] = [];
  listPlanDetail: PlanDetail[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get('/api/plan/get')
      .subscribe((res: any) => {
        if (res?.success) {
          this.listPlan = res?.data;
          this.listPlanDetail = res?.data[0]?.listDetail ?? [];
        }
      });
  }

}
