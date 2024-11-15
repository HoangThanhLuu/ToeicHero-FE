import {Component, OnInit} from '@angular/core';
import {AdminLibBaseCss2, AdminStyle} from '../admin.style';
import {Plan} from '../../common/model/Plan';
import {PlanDetail} from '../../common/model/PlanDetail';
import {HttpClient} from '@angular/common/http';
import {forkJoin} from 'rxjs';
import {BsModalService} from 'ngx-bootstrap/modal';
import {AddPlanComponent, Mode, ModeType} from './add-plan/add-plan.component';
import {ToastrService} from 'ngx-toastr';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss', ...AdminLibBaseCss2, ...AdminStyle]
})
export class PriceComponent implements OnInit {
  title: string = 'Price management';
  currentPage: string = 'Price';
  listPlan: Plan[] = [];
  listPlanDetail: PlanDetail[] = [];
  currentPlan = -1;

  constructor(
    private http: HttpClient,
    private bsModal: BsModalService,
    private toastr: ToastrService,
    private modal: NzModalService,
  ) {
  }

  ngOnInit(): void {
    this.getListPlan();
  }

  openCreatePlan(item?: Plan) {
    const state = {
      modeType: ModeType.PLAN,
      mode: item ? Mode.EDIT : Mode.ADD,
      title: item ? 'Edit plan' : 'Add plan',
      dataPlan: item ? item : new Plan()
    };
    this.showModal(state);
  }

  showModal(state: any): void {
    const bsRef = this.bsModal.show(AddPlanComponent, {
      class: 'modal-lg modal-dialog-centered draggable',
      initialState: state
    });
    if (bsRef?.content?.success) {
      bsRef.content.success.subscribe((res: boolean) => {
        res && this.getListPlan();
      });
    }
  }

  getListPlan() {
    this.currentPlan = -1;
    const listPlanSub = this.http.get('/api/plan/list');
    const listPlanDetailSub = this.http.get('/api/plan/list-detail');
    forkJoin([listPlanSub, listPlanDetailSub]).subscribe((res: Array<any>) => {
      this.listPlan = res[0]?.success ? res[0]?.data : [];
      this.listPlanDetail = res[1]?.success ? res[1]?.data : [];
    });
  }

  getPlanDetail(id: number) {
    this.currentPlan = id;
    this.http.get(`/api/plan/list-detail-by-id?planId=${id}`)
      .subscribe((res: any) => {
        const listTempPlanDetail: PlanDetail[] = res?.success ? res?.data : [];
        this.listPlanDetail.forEach((item: PlanDetail) => {
          item.status = listTempPlanDetail.some((tempItem: PlanDetail) => tempItem.planDetailId === item.planDetailId);
        });
      });
  }

  delete(planId: any) {
    const url = `/api/plan/delete-plan/${planId}`;
    this.showModalDeleteConfirm(url);
  }

  updatePlanDetailAtPlan(planDetailId: number, status: boolean) {
    const params = {
      planId: this.currentPlan,
      planDetailId,
      active: !status
    };
    this.http.patch('/api/plan/update-plan-detail-status', params)
      .subscribe((res: any) => {
        if (res?.success) {
          this.toastr.success(res?.message);
          this.getPlanDetail(this.currentPlan);
        } else {
          this.toastr.error(res?.message);
        }
      });
  }

  openCreatePlanDetail(item?: any) {
    const state = {
      modeType: ModeType.PLAN_DETAIL,
      mode: item ? Mode.EDIT : Mode.ADD,
      title: item ? 'Edit plan detail' : 'Add plan detail',
      dataPlanDetail: item ? item : new PlanDetail()
    };
    this.showModal(state);
  }


  deletePlanDetail(planDetailId: number) {
    const url = `/api/plan/delete-plan-detail/${planDetailId}`;
    this.showModalDeleteConfirm(url);
  }

  showModalDeleteConfirm(url: string) {
    const confirmModal: NzModalRef = this.modal.create({
      nzTitle: `Confirm`,
      nzContent: `Do you want to delete?`,
      nzCentered: true,
      nzFooter: [
        {
          label: 'Cancel',
          onClick: () => confirmModal.destroy()
        }, {
          label: 'Ok',
          type: 'primary',
          onClick: () => {
            this.http.delete<any>(url)
              .subscribe({
                next: (res: any) => {
                  if (res?.success) {
                    this.toastr.success(res?.message);
                    this.getListPlan();
                  } else {
                    this.toastr.error(res?.message);
                  }
                },
                error: _ => {
                  this.toastr.error('Failed to delete');
                }
              });
          }
        }
      ]
    });
  }

}
