import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {log} from "ng-zorro-antd/core/logger";
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {NgxSpinnerService} from "ngx-spinner";
import {finalize} from "rxjs";


@Component({
  selector: 'app-otp-confirm',
  templateUrl: './otp-confirm.component.html',
  styleUrls: ['./otp-confirm.component.css']
})
export class OtpConfirmComponent implements OnInit {

  @Input() otpCode: string = '';
  @Input() email: string = '';
  otp: string[] = ["", "", "", "", "", ""];
  @Output() confirmed = new EventEmitter();

  constructor(private bs: BsModalRef,
              private toast: ToastrService,
              private http: HttpClient,
              private spinnerService: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
  }


  closeModal() {
    this.bs.hide();
  }

  handleInput(event: any, nextIndex: number) {
    const updateIndex = nextIndex == 1 ? 5 : nextIndex - 2;
    const maxLength = 1;
    const currentInput = event.target.value;
    const pressedKey = event.key;
    if (!isNaN(Number(pressedKey))) {
      event.target.value = pressedKey;
      const nextInput = document.querySelector(`.otp-field[name="opt-field[]"]:nth-child(${nextIndex})`) as HTMLInputElement | null;
      if (event.target.value.length === maxLength) {
        this.otp[updateIndex] = event.target.value;
        if (nextInput) {
          nextInput.focus();
        }
      }
    } else {
      event.target.value = '';
      this.otp[updateIndex] = '';
    }
    event.preventDefault();
  }


  confirmOtp() {
    if (this.otp.some(item => item === '')) {
      this.toast.error('Vui lòng nhập đầy đủ mã OTP');
      return;
    }
    const otpCode = this.otp.join('');
    if (otpCode === this.otpCode) {
      this.spinnerService.show();
      this.http.post(`/api/user/confirm-otp?email=${encodeURIComponent(this.email)}`, {})
        .pipe(
          finalize(() => {
            this.spinnerService.hide();
          }))
        .subscribe((res: any) => {
          if (res?.success) {
            this.confirmed.emit();
            this.toast.success('Xác thực thành công');
            this.closeModal();
          } else {
            this.toast.error(res?.message);
          }
        });
    } else {
      this.toast.error('Mã OTP không chính xác');
    }
  }

  handleClick(index: number) {
    if (this.otp[index]) {
      const inputElement = document.querySelector(`.otp-field[name="opt-field[]"]:nth-child(${index + 1})`) as HTMLInputElement | null;
      if (inputElement) {
        inputElement.focus();
      }
    }
  }

  sendAgainEmail() {
    this.spinnerService.show();
    this.http.post('/api/user/send-email', {to: this.email})
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        }))
      .subscribe((res: any) => {
        if (res?.success) {
          this.toast.success('Gửi lại mã OTP thành công');
          this.otpCode = res?.data;
        } else {
          this.toast.error(res?.message);
        }
      });
  }
}
