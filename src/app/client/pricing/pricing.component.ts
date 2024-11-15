import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Plan} from '../../common/model/Plan';
import {NzDrawerRef, NzDrawerService} from 'ng-zorro-antd/drawer';
import {ProfileService} from '../../common/profile.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent implements OnInit {
  @ViewChild('drawerTemplate', {static: false}) drawerTemplate?: TemplateRef<{
    $implicit: { value: Plan };
    drawerRef: NzDrawerRef<string>;
  }>;
  @ViewChild('footer', {static: false}) footer?: TemplateRef<any>;
  listMethodPayment: MethodPayment[] = [];
  list: DataPricing = new DataPricing();


  constructor(private http: HttpClient, private drawerService: NzDrawerService, private profileService: ProfileService) {
    this.listMethodPayment = [
      new MethodPayment('Visa Card', MethodPaymentEnum.VISA, [
        new MethodImg('assets/images/logo-visa.png', 52, 17),
        new MethodImg('assets/images/logo-mastercard.png', 49, 30)
      ]),
      new MethodPayment('Paypal', MethodPaymentEnum.PAYPAL, [
        new MethodImg('assets/images/logo-paypal.png', 71, 19)
      ]),
      new MethodPayment('Vn Pay', MethodPaymentEnum.VN_PAY, [
        new MethodImg('assets/images/logo-vnpay-rs.webp', 50, 50)
      ]),
    ];
  }

  ngOnInit(): void {
    this.http.get('/api/plan/get')
      .subscribe((res: any) => {
        if (res?.success) {
          this.list = res?.data;
        }
      });
  }

  buyPackage(plan: Plan) {
    const drawerRef = this.drawerService.create({
      nzTitle: 'Phương thức thanh toán',
      nzFooter: this.footer,
      nzContent: this.drawerTemplate
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Template) open');
    });

    drawerRef.afterClose.subscribe(() => {
      console.log('Drawer(Template) close');
    });
  }

  continueBuy() {
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

export class MethodPayment {
  name: string;
  value: MethodPaymentEnum;
  image: MethodImg[];

  constructor(name: string, value: MethodPaymentEnum, image: MethodImg[] = []) {
    this.name = name;
    this.value = value;
    this.image = image;
  }
}

export enum MethodPaymentEnum {
  VISA = 'VISA',
  PAYPAL = 'PAYPAL',
  VN_PAY = 'VN_PAY'
}

export class MethodImg {
  url: string;
  width: number;
  height: number;

  constructor(url: string, width: number, height: number) {
    this.url = url;
    this.width = width;
    this.height = height;
  }
}
