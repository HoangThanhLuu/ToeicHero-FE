import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Params} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.scss'
})
export class ThankYouComponent implements OnInit {
  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private toast: ToastrService,
              private spinnerService: NgxSpinnerService) {
  }

  mapHandle: Record<string, (param: Params) => void> = {
    'stripe': (param: Params) => {
      if (param['s'] == 'success') {
        this.updateUserType();
      } else {
        this.toast.error('Thanh toán thất bại, vui lòng thử lại sau');
      }
    },
    'paypal': (param: Params) => {
    },
    'vnpay': (param: Params) => {
      if (param['vnp_ResponseCode'] === '00') {
        this.updateUserType();
      } else {
        this.toast.error('Thanh toán thất bại, vui lòng thử lại sau');
      }
    }
  };

  ngOnInit(): void {
    const paymentPath = this.route.snapshot.params;
    this.route.queryParams.subscribe(params => {
      this.mapHandle[paymentPath['payment']](params);
    });
  }

  updateUserType() {
    this.spinnerService.show().then();
    this.http.patch('/api/user/update-user-type', {})
      .subscribe((res: any) => {
        if (res?.success) {
          this.toast.success('Bạn đã đăng ký gói thành viên thành công');
          this.spinnerService.hide().then();
        } else {
          this.toast.error('Có lỗi xảy ra, vui lòng thử lại sau');
          this.spinnerService.hide().then();
        }
      });
  }

}
