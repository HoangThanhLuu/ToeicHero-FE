import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Plan} from '../../common/model/Plan';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent implements OnInit {
  list: DataPricing = new DataPricing();

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get('/api/plan/get')
      .subscribe((res: any) => {
        if (res?.success) {
          this.list = res?.data;
        }
      });
  }

}

export class DataPricing {
  listPlan: Plan[] = [];
  listDetail: PlanRs[] = [];
}

export class PlanRs {
  planDetailId: number;
  planDetailName: string;
  listStatus: boolean[];

  constructor(planDetailId: number, planDetailName: string, listStatus: boolean[]) {
    this.planDetailId = planDetailId;
    this.planDetailName = planDetailName;
    this.listStatus = listStatus;
  }
}
