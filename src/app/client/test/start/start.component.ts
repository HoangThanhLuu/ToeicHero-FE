import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {
  NzModalRef,
  NzModalService
} from 'ng-zorro-antd/modal';
import {BsModalService} from 'ngx-bootstrap/modal';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute} from '@angular/router';
import {
  finalize,
  Subscription,
  fromEvent,
  of,
  switchMap,
  timer,
  takeUntil,
  Subject,
} from 'rxjs';
import {LoginComponent} from '../../login/login.component';
import {ProfileService} from '../../../common/profile.service';
import {CONSTANT} from '../../../common/constant';
import {
  tap
} from 'rxjs/operators';
import {ConnectionService, ConnectionServiceOptions, ConnectionState} from 'ng-connection-service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('minutes', {static: true}) minutes: ElementRef | null = null;
  @ViewChild('seconds', {static: true}) seconds: ElementRef | null = null;
  totalTimeInSeconds: number = 120 * 60; // 120 minutes
  parts: number[] = [1, 7, 32, 71, 101, 131, 147];
  buttonStates: { [key: number]: boolean } = {};
  currentExam: any;
  listPart: any = [];
  selectedIndex: number = 0;
  selectedAnswer: { [key: number]: string } = {};
  param: any = {};
  interval: any;
  intervalDetectMultipleLogin: any;
  intervalCacheAnswer: any;
  logAnswer: any;
  message: string = '';
  networkStatus: boolean = navigator.onLine;
  networkStatus$: Subscription = new Subscription();
  tabVisibilityDetector$: Subscription = new Subscription();
  mouseMoveDetector$: Subscription = new Subscription();
  mouseEnterSubject$ = new Subject<void>();
  showAlert: boolean[] = Array(10).fill(false);
  defaultFormatAnswer: string = CONSTANT.formatAnswer;

  constructor(private toast: ToastrService,
              private http: HttpClient,
              private modal: NzModalService,
              private bs: BsModalService,
              private spinnerService: NgxSpinnerService,
              private route: ActivatedRoute,
              private connectionService: ConnectionService,
              protected profileService: ProfileService) {

  }

  ngAfterViewInit(): void {
    if (!this.profileService.userIsLogin() && !this.profileService.currentUser.userId) {
      const confirmModal: NzModalRef = this.modal.create({
        nzTitle: `Vui lòng đăng nhập để thực hiện bài thi`,
        nzContent: `Bạn chưa đăng nhập, vui lòng đăng nhập để thực hiện bài thi?`,
        nzCentered: true,
        nzFooter: [
          {
            label: 'Đồng ý',
            type: 'primary',
            onClick: _ => {
              confirmModal.destroy();
              this.bs.show(LoginComponent, {
                class: 'modal-lg modal-dialog-centered',
                ignoreBackdropClick: true,
                initialState: {
                  isNotDirect: true,
                  directLink: window.location.href
                }
              });
            }
          }
        ]
      });
    } else {
      this.initData();
    }
  }

  ngOnInit(): void {
    this.checkNetworkStatus();
    this.detectMultipleLogin();
  }

  detectMultipleLogin() {
    this.intervalDetectMultipleLogin = setInterval(() => {
      this.http.get('/api/user/check-multiple-login')
        .subscribe((res: any) => {
          if (res?.success) {
            if (res?.data) {
              const confirmModal: NzModalRef = this.modal.create({
                nzTitle: `Tài khoản của bạn đã đăng nhập ở một thiết bị khác! Vui lòng đăng nhập lại!`,
                nzContent: ``,
                nzCentered: true,
                nzFooter: [
                  {
                    label: 'Đồng ý',
                    type: 'primary',
                    onClick: () => {
                      localStorage.removeItem('token');
                      localStorage.setItem('tokenValid', 'false');
                      localStorage.removeItem('profile');
                      window.location.href = '/home';
                      confirmModal.destroy();
                    }
                  }
                ]
              });
            }
          }
        });
    }, 15_000);
  }

  detectTabVisibility() {
    this.tabVisibilityDetector$ = fromEvent(document, 'visibilitychange')
      .subscribe(() => {
        if (document.visibilityState === 'hidden') {
          if (!this.showAlert[0]) {
            this.showToast('Bạn đã chuyển tab');
            this.param.totalOpenNewTab++;
            localStorage.setItem(`${this.defaultFormatAnswer}_${this.currentExam.examId}`, JSON.stringify(this.param));
            this.showAlert[0] = true;
          }
        } else {
          this.showAlert[0] = false;
        }
      });
  }

  detectMouseMove() {
    this.mouseMoveDetector$ = fromEvent(document, 'mouseleave')
      .pipe(
        switchMap(() => timer(2000).pipe(
          takeUntil(fromEvent(document, 'mouseenter').pipe(
            tap(() => {
              this.showAlert[1] = false;
              this.mouseEnterSubject$.next(); // Thông báo khi chuột vào lại
            })
          )),
          tap(() => {
            if (!this.showAlert[1]) {
              this.showToast('Bạn đã rời khỏi trang web');
              this.param.totalLeave++;
              localStorage.setItem(`${this.defaultFormatAnswer}_${this.currentExam.examId}`, JSON.stringify(this.param));
              this.showAlert[1] = true;
            }
          }),
          switchMap(() => of(null).pipe( // Chuyển sang observable không kết thúc
            takeUntil(this.mouseEnterSubject$) // Duy trì toast cho đến khi chuột vào lại
          ))
        ))
      )
      .subscribe();
  }

  showToast(msg: string) {
    this.toast.warning(msg, 'Cảnh báo', {
      timeOut: 0, // Không tự động tắt toast
      extendedTimeOut: 0,
      closeButton: false,
    });
  }

  checkNetworkStatus(): void {
    const options: ConnectionServiceOptions = {
      heartbeatUrl: window.location.origin,
    }
    this.connectionService.monitor(options).subscribe((isConnected: ConnectionState) => {
      if (isConnected.hasNetworkConnection && isConnected.hasInternetAccess) {
        this.networkStatus = true;
        this.showAlert[2] = false;
        this.spinnerService.hide('test').then();
      } else {
        this.networkStatus = false;
        if (!this.showAlert[2]) {
          this.showToast('Mất kết nối internet');
          this.showAlert[2] = true;
        }
        this.message = 'Mất kết nối internet';
        this.spinnerService.show('test').then();
      }
    })
  }

  initData() {
    this.route.params.subscribe(params => {
      const examId = params['examId'];
      this.logAnswer = localStorage.getItem(`${this.defaultFormatAnswer}_${examId}`) ?? '{}';

      // convert log to json
      this.logAnswer = JSON.parse(this.logAnswer);

      this.spinnerService.show().then();
      this.http.get(`/api/exam/find-full-question/${examId}`)
        .pipe(finalize(() => {
          this.spinnerService.hide().then();
        }))
        .subscribe((res: any) => {
          if (res?.success) {
            this.currentExam = res?.data;
            this.listPart = res?.data?.parts;
            this.initializeSelectedAnswer();
          } else {
            this.toast.error(res?.message);
            window.location.href = '/list-test';
          }
        });
    });
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.totalTimeInSeconds--;
      const minutes = Math.floor(this.totalTimeInSeconds / 60);
      const remainingSeconds = this.totalTimeInSeconds % 60;

      if (this.minutes?.nativeElement) {
        this.minutes.nativeElement.textContent = this.formatTime(minutes);
      }

      if (this.seconds?.nativeElement) {
        this.seconds.nativeElement.textContent = this.formatTime(remainingSeconds);
      }
      if (this.totalTimeInSeconds <= 0) {
        clearInterval(this.interval);
        this.toast.success('Hết thời gian làm bài');
        const isNotSelectAll = this.checkSelectedAll();
        this.submitTest(isNotSelectAll);
      }
    }, 1000);
  }

  formatTime(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }

  finishTest() {
    const isNotSelectAll = this.checkSelectedAll();
    const isNotSubmit = this.totalTimeInSeconds > 0;
    if (isNotSelectAll && isNotSubmit) {
      const confirmModal: NzModalRef = this.modal.create({
        nzTitle: `Xác nhận`,
        nzContent: `Bạn chưa hoàn thành bài thi, bạn có muốn nộp bài không?`,
        nzCentered: true,
        nzFooter: [
          {
            label: 'Hủy',
            onClick: () => confirmModal.destroy()
          },
          {
            label: 'Đồng ý',
            type: 'primary',
            onClick: () => {
              this.submitTest(isNotSelectAll);
              confirmModal.destroy();
            }
          }
        ]
      });
    }
  }

  submitTest(done: boolean = false) {
    this.param.timeRemaining = this.totalTimeInSeconds;
    this.param.totalQuestion = 200;
    this.param.isFullTest = true;
    this.param.isDone = done;
    this.spinnerService.show().then();
    this.http.post('/api/exam/finish-exam', this.param)
      .pipe(
        finalize(() => {
          this.spinnerService.hide().then(r => r);
        }))
      .subscribe((res: any) => {
        if (res?.success) {
          this.ngOnDestroy();
          localStorage.removeItem(`${this.defaultFormatAnswer}_${this.currentExam.examId}`);
          this.http.post(`api/user-exam-log/remove-answer/${this.currentExam.examId}`, {})
            .subscribe({
              next: _ => {
              }
            });
          this.toast.success('Nộp bài thành công');
          window.location.href = `/test/${this.currentExam?.examId}/result/${res?.data}`;
        } else {
          this.toast.error(res?.message);
        }
      });
  }

  initializeButtonStates() {
    this.listPart.forEach((part: any) => {
      part.questions.forEach((question: any) => {
        this.buttonStates[question.questionId] = false;
      });
    });
  }

  nextPart() {
    this.selectedIndex = Math.min(6, this.selectedIndex + 1);
  }

  previousPart() {
    this.selectedIndex = Math.max(0, this.selectedIndex - 1);
  }

  protected readonly Number = Number;

  changeStateButton(selectedAnswerValue: string, questionId: number) {
    this.selectedAnswer[questionId] = selectedAnswerValue;
    this.buttonStates[questionId] = true;
    const answer = this.param.answers.find((answer: any) => answer.questionId === questionId);
    if (answer) {
      answer.answer = selectedAnswerValue;
    }
    localStorage.setItem(`${this.defaultFormatAnswer}_${this.currentExam.examId}`, JSON.stringify(this.param));
  }

  switchToTab(partIndex: number, questionId: number) {
    this.selectedIndex = partIndex;
    this.scrollToQuestion(partIndex, questionId);
  }

  scrollToQuestion(partIndex: number, questionId: number) {
    this.selectedIndex = partIndex;
    setTimeout(() => {
      const questionContainer = document.getElementById(`questionContainer_${partIndex}_${questionId}`);
      if (questionContainer) {
        questionContainer.scrollIntoView({behavior: 'smooth', block: 'center'});
      }
    }, 100);
  }

  checkSelectedAll(): boolean {
    return Object.values(this.buttonStates).every(value => value);
  }

  private initializeSelectedAnswer() {
    if (this.logAnswer?.examId) {
      this.param = JSON.parse(JSON.stringify(this.logAnswer));
      if (this.param?.endTime && new Date(this.param.endTime).getTime() < new Date().getTime()) {
        this.toast.error('Bài thi đã hết giờ làm bài');
        const isNotSelectAll = this.checkSelectedAll();
        this.submitTest(isNotSelectAll);
      } else {
        this.totalTimeInSeconds = (new Date(this.param.endTime).getTime() - new Date().getTime()) / 1000;
        this.totalTimeInSeconds = Math.ceil(this.totalTimeInSeconds);
        this.param.answers.forEach((answer: any) => {
          this.selectedAnswer[answer.questionId] = answer.answer;
          this.buttonStates[answer.questionId] = !!answer.answer;
        });
        this.param = JSON.parse(JSON.stringify(this.logAnswer));
      }
    } else {
      let haveData = false;
      this.http.get(`api/user-exam-log/get-list-answer?examId=${this.currentExam.examId}`)
        .subscribe({
          next: (res: any) => {
            if (res?.success) {
              this.param = res?.data;
              haveData = !!res?.data;
              this.param.answers.forEach((answer: any) => {
                this.selectedAnswer[answer.questionId] = answer.answer;
                this.buttonStates[answer.questionId] = !!answer.answer;
              });
            }
          }
        });
      if (this.param?.endTime && new Date(this.param.endTime).getTime() < new Date().getTime()) {
        this.toast.error('Bài thi đã hết giờ làm bài');
        const isNotSelectAll = this.checkSelectedAll();
        this.submitTest(isNotSelectAll);
      } else if (haveData) {
        this.totalTimeInSeconds = (new Date(this.param.endTime).getTime() - new Date().getTime()) / 1000;
        this.totalTimeInSeconds = Math.ceil(this.totalTimeInSeconds);
      } else {
        this.totalTimeInSeconds = 120 * 60;
      }
      if (!this.param?.examId) {
        this.param.examId = this.currentExam.examId;
        this.param.totalTime = 120 * 60;
        this.param.totalLeave = 0;
        this.param.totalOpenNewTab = 0;
        this.param.startTime = new Date();
        this.param.endTime = new Date(this.param.startTime.getTime() + this.param.totalTime * 1000);
        this.param.answers = [];
        this.listPart.forEach((part: any) => {
          const partCode = part.partCode;
          part.questions.forEach((question: any) => {
            const questionId = question.questionId;
            this.selectedAnswer[question.questionId] = '';
            this.param.answers.push({
              questionId: questionId,
              answer: '',
              partCode: partCode
            });
          });
        });
        this.initializeButtonStates();
      }
    }
    this.startTimer();
    this.cacheAnswer();
    this.detectTabVisibility();
    this.detectMouseMove();
  }

  changePart(event: any) {
    event === 'next' ? this.nextPart() : this.previousPart();
  }

  selectedAnswerChange(event: any) {
    this.changeStateButton(event.answer, event.questionId);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
    clearInterval(this.intervalCacheAnswer);
    clearInterval(this.intervalDetectMultipleLogin);
    this.networkStatus$.unsubscribe();
    this.tabVisibilityDetector$.unsubscribe();
    this.mouseMoveDetector$.unsubscribe();
  }

  cacheAnswer() {
    this.intervalCacheAnswer = setInterval(() => {
      if (this.networkStatus) {
        this.http.post('api/user-exam-log/save-answer', this.param)
          .subscribe({
            next: _ => {
            }
          });
      }
    }, 15_000);
  }
}
