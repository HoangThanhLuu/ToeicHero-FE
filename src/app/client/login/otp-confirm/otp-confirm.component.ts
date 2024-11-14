import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {ToastrService} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {finalize} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-otp-confirm',
  templateUrl: './otp-confirm.component.html',
  styleUrls: ['./otp-confirm.component.css']
})
export class OtpConfirmComponent {
  @Input() email: string = '';
  otp: string[] = ['', '', '', '', '', ''];
  @Output() confirmed = new EventEmitter();

  constructor(private bs: BsModalRef,
              private toast: ToastrService,
              private http: HttpClient,
              private spinnerService: NgxSpinnerService,
              private translate: TranslateService
  ) {
  }


  closeModal() {
    this.bs.hide();
  }

  handleInput(event: any, nextIndex: number) {
    const updateIndex = nextIndex == 1 ? 5 : nextIndex - 2;
    const maxLength = 1;
    const pressedKey = event.key;
    if (!isNaN(Number(pressedKey))) {
      event.target.value = pressedKey;
      const nextInput = document.querySelector(`.otp-field[name='opt-field[]']:nth-child(${nextIndex})`) as HTMLInputElement | null;
      if (event.target.value.length === maxLength) {
        this.otp[updateIndex] = event.target.value;
        if (nextInput) {
          nextInput.focus();
        }
      }
    } else if (pressedKey === 'Backspace') {

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
    this.spinnerService.show().then();
    this.http.post(`/api/user/confirm-otp`, {email: this.email, otp: otpCode})
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        }))
      .subscribe((res: any) => {
        const msg = this.translate.instant(`OTP.${res?.message}`);
        if (res?.success) {
          this.confirmed.emit();
          this.toast.success(msg);
          this.closeModal();
        } else {
          this.toast.error(msg);
        }
      });
  }

  handleClick(index: number) {
    if (this.otp[index]) {
      const inputElement = document.querySelector(`.otp-field[name='opt-field[]']:nth-child(${index + 1})`) as HTMLInputElement | null;
      if (inputElement) {
        inputElement.focus();
      }
    }
  }

  sendAgainEmail() {
    this.spinnerService.show();
    this.http.post('/api/user/send-email', {
      to: this.email,
      templateCode: 'AUTHENTICATION_AFTER_REGISTER'
    })
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        }))
      .subscribe((res: any) => {
        if (res?.success) {
          this.toast.success('Gửi lại mã OTP thành công');
        } else {
          this.toast.error(res?.message);
        }
      });
  }
}
