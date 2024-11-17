import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {NzResultStatusType} from 'ng-zorro-antd/result';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.scss'
})
export class ThankYouComponent implements OnInit {
  status: NzResultStatusType = 'info';
  title: string = 'Đang xử lý thanh toán';
  subTitle: string = 'Giao dịch của bạn đang được xử lý, vui lòng đợi trong giây lát';

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private toast: ToastrService,
              private router: Router,
              private spinnerService: NgxSpinnerService) {
  }

  mapHandle: Record<string, (param: Params) => void> = {
    'stripe': (param: Params) => {
      if (param['s'] == 'success') {
        this.updateUserType();
      } else {
        this.failPayment();
      }
    },
    'paypal': (param: Params) => {
      const token = param['token'];
      if (token) {
        this.spinnerService.show().then(r => r);
        this.http.post(`/api/payment/paypal/confirm?token=${token}`, {})
          .subscribe((res: any) => {
            this.spinnerService.hide().then();
            if (res?.success) {
              this.toast.success('Thanh toán thành công');
              this.successPayment();
            } else {
              this.failPayment();
            }
          });
      } else {
        this.failPayment();
      }
    },
    'vnpay': (param: Params) => {
      const date = param['vnp_PayDate'];
      const ref = param['vnp_TxnRef'];
      if (date && ref) {
        this.spinnerService.show().then(r => r);
        this.http.post('/api/payment/vn-pay/confirm', {transDate: date, txnRef: ref})
          .subscribe((res: any) => {
            this.spinnerService.hide().then();
            if (res?.success) {
              this.successPayment();
              this.toast.success('Thanh toán thành công');
            } else {
              this.failPayment();
            }
          });
      } else {
        this.failPayment();
      }
    }
  };

  ngOnInit(): void {
    const paymentPath = this.route.snapshot.params;
    this.route.queryParams.subscribe(params => {
      this.mapHandle[paymentPath['payment']](params);
    });
  }

  failPayment() {
    this.toast.error('Thanh toán thất bại, vui lòng thử lại sau');
    this.status = 'error';
    this.title = 'Thanh toán thất bại';
    this.subTitle = 'Thanh toán của bạn đã thất bại, vui lòng thử lại sau';
  }

  successPayment() {
    this.toast.success('Thanh toán thành công');
    this.status = 'success';
    this.title = 'Thanh toán thành công';
    this.subTitle = 'Bạn đã thanh toán thành công, cảm ơn bạn đã sử dụng dịch vụ của chúng tôi';
  }

  returnHome() {
    this.router.navigate(['/']).then();
  }

  updateUserType() {
    this.spinnerService.show().then();
    this.http.patch('/api/user/update-user-type', {})
      .subscribe((res: any) => {
        if (res?.success) {
          this.toast.success('Bạn đã đăng ký gói thành viên thành công');
          this.successPayment();
          this.spinnerService.hide().then();
        } else {
          this.failPayment();
          this.spinnerService.hide().then();
        }
      });
  }
}
