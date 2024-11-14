import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {
  NzModalRef,
  NzModalService
} from "ng-zorro-antd/modal";
import {BsModalService} from "ngx-bootstrap/modal";
import {NgxSpinnerService} from "ngx-spinner";
import {ActivatedRoute} from "@angular/router";
import {
  finalize,
  Subscription,
  fromEvent,
  merge,
  of,
  switchMap,
  filter,
  timer,
  takeUntil,
  Subject,
  delayWhen
} from "rxjs";
import {LoginComponent} from "../../login/login.component";
import {ProfileService} from "../../../common/profile.service";
import {CONSTANT} from '../../../common/constant';
import {
  map,
  tap
} from 'rxjs/operators';

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
  intervalCacheAnswer: any;
  logAnswer: any;
  logSelectedAnswer: any;
  logButtonStates: any;
  networkStatus: boolean = navigator.onLine;
  networkStatus$: Subscription = new Subscription();
  tabVisibilityDetector$: Subscription = new Subscription();
  mouseMoveDetector$: Subscription = new Subscription();
  mouseEnterSubject$ = new Subject<void>();

  constructor(private toast: ToastrService,
              private http: HttpClient,
              private modal: NzModalService,
              private bs: BsModalService,
              private spinnerService: NgxSpinnerService,
              private route: ActivatedRoute,
              protected profileService: ProfileService) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (!this.profileService.userIsLogin() && !this.profileService.currentUser.userId) {
        const confirmModal: NzModalRef = this.modal.create({
          nzTitle: `Vui lòng đăng nhập để thực hiện bài thi`,
          nzContent: `Bạn chưa đăng nhập, vui lòng đăng nhập để thực hiện bài thi?`,
          nzCentered: true,
          nzFooter: [
            {
              label: 'Đồng ý',
              type: 'primary',
              onClick: () => {
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
    }, 1_000);
  }

  ngOnInit(): void {
    this.checkNetworkStatus();
  }

  detectTabVisibility() {
    this.tabVisibilityDetector$ = fromEvent(document, 'visibilitychange')
      .subscribe(() => {
        if (document.visibilityState === 'hidden') {
          this.showToast('Bạn đã chuyển tab');
          this.param.totalOpenNewTab++;
          localStorage.setItem(`${CONSTANT.formatAnswer}_${this.currentExam.examId}`, JSON.stringify(this.param));
        }
      });
  }

  detectMouseMove() {
    this.mouseMoveDetector$ = fromEvent(document, 'mouseleave')
      .pipe(
        switchMap(() => timer(2000).pipe(
          takeUntil(fromEvent(document, 'mouseenter').pipe(
            tap(() => {
              this.mouseEnterSubject$.next(); // Thông báo khi chuột vào lại
            })
          )),
          tap(() => {
            this.showToast('Bạn đã rời khỏi trang web');
            this.param.totalLeave++;
            localStorage.setItem(`${CONSTANT.formatAnswer}_${this.currentExam.examId}`, JSON.stringify(this.param));
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

  checkNetworkStatus() {
    this.networkStatus = navigator.onLine;
    this.networkStatus$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    )
      .pipe(map(() => navigator.onLine))
      .subscribe(status => {
        this.networkStatus = status;
      });
  }

  initData() {
    this.route.params.subscribe(params => {
      const examId = params['examId'];
      this.logAnswer = localStorage.getItem(`${CONSTANT.formatAnswer}_${examId}`) || '{}';
      this.logButtonStates = localStorage.getItem(`${CONSTANT.formatStateButton}_${examId}`) || '{}';
      this.logSelectedAnswer = localStorage.getItem(`${CONSTANT.formatSelectAnswer}_${examId}`) || '{}';

      // convert log to json
      this.logAnswer = JSON.parse(this.logAnswer);
      this.logButtonStates = JSON.parse(this.logButtonStates);
      this.logSelectedAnswer = JSON.parse(this.logSelectedAnswer);

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
    localStorage.setItem(`${CONSTANT.formatAnswer}_${this.currentExam.examId}`, JSON.stringify(this.param));
    localStorage.setItem(`${CONSTANT.formatStateButton}_${this.currentExam.examId}`, JSON.stringify(this.buttonStates));
    localStorage.setItem(`${CONSTANT.formatSelectAnswer}_${this.currentExam.examId}`, JSON.stringify(this.selectedAnswer));
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
        this.buttonStates = JSON.parse(JSON.stringify(this.logButtonStates));
        this.selectedAnswer = JSON.parse(JSON.stringify(this.logSelectedAnswer));
        this.param = JSON.parse(JSON.stringify(this.logAnswer));
        this.param.totalLeave ??= 0;
        this.param.totalOpenNewTab ??= 0;
      }
    } else {



      this.param.examId = this.currentExam.examId;
      this.param.totalTime = 120 * 60;
      this.param.totalLeave = 0;
      this.param.totalOpenNewTab = 0;
      this.param.startTime = new Date();
      this.param.endTime = new Date(this.param.startTime.getTime() + this.param.totalTime * 1000);
      this.param.answers = [];
      this.listPart.forEach((part: any, partIndex: any) => {
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
    this.startTimer();
    // this.cacheAnswer();
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
    this.networkStatus$.unsubscribe();
    this.tabVisibilityDetector$.unsubscribe();
    this.mouseMoveDetector$.unsubscribe();
  }

  cacheAnswer() {
    this.intervalCacheAnswer = setInterval(() => {
      if (this.networkStatus) {
        this.http.post('api/user-exam-log/save-answer', this.param)
          .subscribe({
            next: (res: any) => {
              if (res?.success) {
              }
            }
          });
      }
    }, 15_000);
  }
}
