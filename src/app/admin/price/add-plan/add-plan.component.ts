import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AdminLibBaseCss3, AdminStyle2} from '../../admin.style';
import {HttpClient} from '@angular/common/http';
import {Plan} from '../../../common/model/Plan';
import {PlanDetail} from '../../../common/model/PlanDetail';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.scss', ...AdminLibBaseCss3, ...AdminStyle2,]
})
export class AddPlanComponent implements OnInit {
  @Input() title: string = 'Add plan';
  @Input() modeType: ModeType = ModeType.PLAN;
  @Input() mode: Mode = Mode.ADD;
  @Input() dataPlan: Plan = new Plan();
  @Input() dataPlanDetail: PlanDetail = new PlanDetail();

  @Output() success: EventEmitter<boolean> = new EventEmitter<boolean>();

  message: string = '';
  showBorderError: boolean[] = Array(10).fill(false);
  listTagInputPlan: Tag[] = [
    {
      key: 'planId',
      name: 'Plan ID',
      placeHolder: 'Auto generate'
    },
    {
      key: 'planName',
      name: 'Plan name',
      placeHolder: 'Enter plan name'
    },
    {
      key: 'planPrice',
      name: 'Price',
      placeHolder: 'Enter price'
    },
    {
      key: 'description',
      name: 'Description',
      placeHolder: 'Enter description'
    }
  ];

  listTagInputPlanDetail: Tag[] = [
    {
      key: 'planDetailId',
      name: 'Plan detail ID',
      placeHolder: 'Auto generate'
    },
    {
      key: 'planDetailName',
      name: 'Plan detail name',
      placeHolder: 'Enter plan detail name'
    }
  ];
  listTagInput: InputTag[] = [];
  mapGetListTagInput: Record<ModeType, () => InputTag[]> = {
    [ModeType.PLAN]: () => {
      let rs = this.listTagInputPlan.map((item: Tag) => new InputTag(item.key, item.name, '', item.placeHolder));
      if (this.mode === Mode.EDIT) {
        Object.entries(this.dataPlan).forEach((item: any) => {
          const temp = rs.find((tag: InputTag) => tag.key === item[0]);
          if (temp) {
            temp.value = item[1];
          }
        });
      } else {
        rs = rs.filter((item: InputTag) => item.key !== 'planId');
      }
      return rs;
    },
    [ModeType.PLAN_DETAIL]: () => {
      let rs = this.listTagInputPlanDetail.map((item: Tag) => new InputTag(item.key, item.name, '', item.placeHolder));
      if (this.mode === Mode.EDIT) {
        Object.entries(this.dataPlanDetail).forEach((item: any) => {
          const temp = rs.find((tag: InputTag) => tag.key === item[0]);
          if (temp) {
            temp.value = item[1];
          }
        });
      } else {
        rs = rs.filter((item: InputTag) => item.key !== 'planDetailId');
      }
      return rs;
    }
  };

  mapFunc: Record<ModeType, (params: any) => Observable<any>> = {
    [ModeType.PLAN]: (params: any) => {
      return this.http.post('/api/plan/update-plan', params);
    },
    [ModeType.PLAN_DETAIL]: (params: any) => {
      return this.http.post('/api/plan/update-plan-detail', params);
    }
  };

  constructor(private http: HttpClient, private bsModalRef: BsModalRef, private toast: ToastrService) {

  }

  ngOnInit(): void {
    this.listTagInput = this.mapGetListTagInput[this.modeType]();
  }

  cancel() {
    this.bsModalRef.hide();
  }

  addNew() {
    const ok = this.validateInput();
    if (!ok) {
      this.toast.warning('Please fill in all required fields');
      return;
    }
    let params: { [key: string]: string } = {};
    this.listTagInput.forEach((item: InputTag) => {
      params[item.key] = item.value;
    });
    this.mapFunc[this.modeType](params).subscribe((res: any) => {
      if (res?.success) {
        this.success.emit(true);
        this.toast.success('Success');
        this.bsModalRef.hide();
      } else {
        this.toast.error(res?.message);
      }
    });
  }

  validateInput() {
    let check = true;
    this.listTagInput.forEach((item: InputTag, index: number) => {
      this.showBorderError[index] = item.value === '';
      check = check && item.value !== '';
    });
    return check;
  }

  protected readonly Mode = Mode;
}


export enum ModeType {
  PLAN = 'plan',
  PLAN_DETAIL = 'plan-detail'
}

export enum Mode {
  ADD = 'add',
  EDIT = 'edit'
}

export class InputTag {
  key: string;
  name: string;
  value: string;
  placeholder: string = '';
  isDisable: boolean = false;

  constructor(key: string, name: string, value: string, placeholder: string = '', isDisable: boolean = false) {
    this.key = key;
    this.name = name;
    this.value = value;
    this.placeholder = placeholder;
    this.isDisable = isDisable;
  }
}

export class Tag {
  key: string;
  name: string;
  placeHolder: string = '';

  constructor(key: string, name: string, placeholder: string = '') {
    this.key = key;
    this.name = name;
    this.placeHolder = placeholder;
  }
}

export class Param {
  key: string;
  value: string;

  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
  }
}
