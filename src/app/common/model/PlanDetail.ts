export class PlanDetail {
  planDetailId: number;
  planDetailName: string;
  status: boolean = false;

  constructor(planDetailId: number = 0, planName: string = '') {
    this.planDetailId = planDetailId;
    this.planDetailName = planName;
  }
}
