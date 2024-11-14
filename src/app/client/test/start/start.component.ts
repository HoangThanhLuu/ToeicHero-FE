import {
  AfterViewInit,
  Component,
  ElementRef,
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
import {finalize} from "rxjs";
import {LoginComponent} from "../../login/login.component";
import {ProfileService} from "../../../common/profile.service";

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

  constructor(private toast: ToastrService,
              private http: HttpClient,
              private modal: NzModalService,
              private bs: BsModalService,
              private spinnerService: NgxSpinnerService,
              private route: ActivatedRoute,
              protected profileService: ProfileService) {
    this.initializeButtonStates();
  }

  ngAfterViewInit(): void {
    if (!this.profileService.isLogin && !this.profileService.currentUser) {
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
                  isNotDirect: true
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

  }

  private initData() {
    this.spinnerService.show();
    this.route.params.subscribe(params => {
      const examId = params['examId'];
      this.http.get(`/api/exam/find-full-question/${examId}`)
        .pipe(finalize(() => {
          this.spinnerService.hide();
        }))
        .subscribe((res: any) => {
          if (res?.success) {
            this.currentExam = res?.data;
            this.listPart = res?.data?.parts;
            this.startTimer();
            this.initializeSelectedAnswer();
          } else {
            this.toast.error(res?.message);
            window.location.href = '/list-test';
          }
        });
    });
  }

  startTimer() {
    const interval = setInterval(() => {
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
        clearInterval(interval);
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
    this.spinnerService.show().then(r => r);
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

  changeStateButton(selectedAnswerValue: string, questionId: number, partCode: string) {
    this.selectedAnswer[questionId] = selectedAnswerValue;
    this.buttonStates[questionId] = true;
    this.param.answers.forEach((answer: any) => {
      if (answer.questionId === questionId) {
        answer.answer = selectedAnswerValue;
      }
    });
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
    this.param.examId = this.currentExam.examId;
    this.param.totalTime = 120 * 60;
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
  }

  changePart(event: any) {
    if (event === 'next') {
      this.nextPart();
    } else {
      this.previousPart();
    }
  }

  selectedAnswerChange(event: any) {
    this.changeStateButton(event.answer, event.questionId, '');
  }

  ngOnDestroy(): void {
  }
}
