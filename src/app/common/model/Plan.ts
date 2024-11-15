import {PlanDetail} from './PlanDetail';

export class Plan {
  planId: number;
  planName: string;
  planPrice: number;
  description: string;

  listDetail: PlanDetail[] = [];

  constructor(planId: number = 0, planName: string = '', planPrice: number = 0, description: string = '') {
    this.planId = planId;
    this.planName = planName;
    this.planPrice = planPrice;
    this.description = description;
  }
}
