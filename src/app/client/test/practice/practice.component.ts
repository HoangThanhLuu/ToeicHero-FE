import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {BsModalService} from "ngx-bootstrap/modal";
import {NgxSpinnerService} from "ngx-spinner";
import {GetHeaderService} from "../../../common/get-headers/get-header.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginComponent} from "../../login/login.component";
import {finalize} from "rxjs";

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {
  @ViewChild('minutes', {static: true}) minutes: ElementRef | null = null;
  @ViewChild('seconds', {static: true}) seconds: ElementRef | null = null;
  currentExam: any;
  listPart: any = [];
  listPartResult: any = [];
  buttonStates: { [key: number]: boolean } = {};
  selectedIndex: number = 0;
  questionPart7Has2Answer: any = ['147', '149', '154', '156'];
  questionPart7Has3Answer: any = ['151', '166', '169'];
  questionPart7Has4Answer: any = ['158', '162', '172'];
  questionPart7Has2Paragraph: any = ['176', '181', '186', '191', '196'];
  selectedAnswer: { [key: number]: string } = {};
  param: any = {};
  totalTimeInSeconds: number = 0;     // initialize the time variable, it's seconds not minutes!
  constructor(private toast: ToastrService,
              private http: HttpClient,
              private modal: NzModalService,
              private bs: BsModalService,
              private bsModalService: BsModalService,
              private spinnerService: NgxSpinnerService,
              private getHeaderService: GetHeaderService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const tokenValid = localStorage.getItem('tokenValid');
    if (tokenValid === 'false') {
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


  private getExam(examId: any) {
    // convert listPart to array
    const listPart = this.listPart.split(',');
    this.spinnerService.show();
    this.http.post(`/api/exam/find-exam-practice/${examId}`, {listPart})
      .pipe(finalize(() => {
        this.spinnerService.hide();
      }))
      .subscribe((res: any) => {
        if (res?.success) {
          this.currentExam = res?.data;
          this.listPartResult = res?.data?.parts;
          this.startTimer();
          this.initializeSelectedAnswer();
        } else {
          this.toast.error(res?.message);
          window.location.href = '/list-test';
        }
      });
  }

  private initData() {
    const examId = this.route.snapshot.params['examId'];
    this.route.queryParams.subscribe(params => {
      this.listPart = params['part'];
      this.getExam(examId);
    })
  }

  private initializeSelectedAnswer() {
    this.param.examId = this.currentExam.examId;
    this.param.answers = [];
    this.listPartResult.forEach((part: any, partIndex: any) => {
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

  initializeButtonStates() {
    this.listPartResult.forEach((part: any) => {
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

  counter(i: number) {
    return new Array(i);
  }

  questionPart7HasAnswerCheck(questNumber: number, list: any) {
    return !!list.includes(questNumber);
  }


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
    }, 10);
  }

  checkSelectedAll(): boolean {
    return Object.values(this.buttonStates).every(value => value);
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
              this.submitTest();
              confirmModal.destroy();
            }
          }
        ]
      });
    }
  }

  startTimer() {
    const interval = setInterval(() => {
      this.totalTimeInSeconds++;

      const minutes = Math.floor(this.totalTimeInSeconds / 60);
      const remainingSeconds = this.totalTimeInSeconds % 60;

      if (this.minutes && this.minutes.nativeElement) {
        this.minutes.nativeElement.textContent = this.formatTime(minutes);
      }

      if (this.seconds && this.seconds.nativeElement) {
        this.seconds.nativeElement.textContent = this.formatTime(remainingSeconds);
      }
    }, 1000);
  }

  formatTime(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }

  private submitTest() {
    this.param.totalTime = this.totalTimeInSeconds;
    this.param.timeRemaining = 0;
    this.param.totalQuestion = this.param.answers.length;
    this.spinnerService.show();
    this.http.post('/api/exam/finish-exam', this.param)
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
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
}