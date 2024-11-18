import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Plan} from '../../common/model/Plan';
import {NzDrawerRef, NzDrawerService} from 'ng-zorro-antd/drawer';
import {ProfileService} from '../../common/profile.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {AuthService} from '../../auth.service';

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
  currentChoicePlan: Plan = new Plan();
  paymentMethod: MethodPaymentEnum = MethodPaymentEnum.VISA;
  mapPayment: Record<MethodPaymentEnum, () => Params> = {
    [MethodPaymentEnum.VISA]: () => new Params('/api/payment/stripe/create', {
      name: this.currentChoicePlan.planName,
      amount: this.currentChoicePlan.planPrice,
      email: this.profileService.getEmail
    }),
    [MethodPaymentEnum.PAYPAL]: () => new Params(`/api/payment/paypal/create`, this.currentChoicePlan.planPrice),
    [MethodPaymentEnum.VN_PAY]: () => new Params('/api/payment/vn-pay/create', {
      orderInfo: 'Dang ky goi thanh vien Toeic hero',
      amount: this.currentChoicePlan.planPrice
    })
  };
  currentUserType: string = '';


  constructor(private http: HttpClient, private auth: AuthService, private drawerService: NzDrawerService, private profileService: ProfileService, private spin: NgxSpinnerService) {
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
    const token = this.auth.getToken();
    const isLogin = token ? !this.auth.isTokenExpired(token) : false;
    if (isLogin) {
      this.profileService.getProfileData().subscribe({
        next: (profile) => {
          if (profile) {
            this.currentUserType = this.profileService.getUserType;
          }
        }
      });
    }
  }

  getNameButton(plan: Plan): string {
    if (plan.planPrice === 0) {
      return 'Miễn phí';
    }
    if (this.currentUserType === 'VIP_USER') {
      return 'Đã mua';
    }
    return 'Mua ngay';
  }

  buyPackage(plan: Plan) {
    if (plan.planPrice === 0 || plan.planPrice === null || this.currentUserType === 'VIP_USER') {
      return;
    }
    this.currentChoicePlan = plan;
    this.drawerService.create({
      nzTitle: 'Phương thức thanh toán',
      nzFooter: this.footer,
      nzContent: this.drawerTemplate
    });
  }

  continueBuy() {
    this.profileService.getProfileData().subscribe({
      next: (profile) => {
        if (profile) {
          this.spin.show().then();
          const param = this.mapPayment[this.paymentMethod]();
          this.http.post(param.url, param.body)
            .subscribe({
              next: (res: any) => {
                if (res?.success) {
                  window.location.href = res?.data;
                }
              },
              complete: () => this.spin.hide().then()
            });
        }
      }
    });
  }
}

export class Params {
  url: string = '';
  body: any = {};

  constructor(url: string, body: any) {
    this.url = url;
    this.body = body;
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
