import {Component, ElementRef, HostListener, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {BsModalService} from "ngx-bootstrap/modal";
import {NgxSpinnerService} from "ngx-spinner";
import {GetHeaderService} from "../../../common/get-headers/get-header.service";
import {ActivatedRoute} from "@angular/router";
import {finalize} from "rxjs";
import {AuthServiceService} from "../../../auth-service.service";
import {LoginComponent} from "../../login/login.component";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  @ViewChild('minutes', {static: true}) minutes: ElementRef | null = null;
  @ViewChild('seconds', {static: true}) seconds: ElementRef | null = null;
  totalTimeInSeconds: number = 120 * 60; // 120 minutes
  parts: number[] = [1, 7, 32, 71, 101, 131, 147];
  buttonStates: { [key: number]: boolean } = {};
  currentExam: any;
  listPart: any = [];
  selectedIndex: number = 0;
  questionPart7Has2Answer: any = ['147', '149', '154', '156'];
  questionPart7Has3Answer: any = ['151', '166', '169'];
  questionPart7Has4Answer: any = ['158', '162', '172'];
  questionPart7Has2Paragraph: any = ['176', '181', '186', '191', '196'];
  selectedAnswer: { [key: number]: string } = {};

  constructor(private toast: ToastrService,
              private http: HttpClient,
              private modal: NzModalService,
              private bs: BsModalService,
              private bsModalService: BsModalService,
              private spinnerService: NgxSpinnerService,
              private getHeaderService: GetHeaderService,
              private authService: AuthServiceService,
              private route: ActivatedRoute) {
    this.initializeButtonStates();
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

      if (this.minutes && this.minutes.nativeElement) {
        this.minutes.nativeElement.textContent = this.formatTime(minutes);
      }

      if (this.seconds && this.seconds.nativeElement) {
        this.seconds.nativeElement.textContent = this.formatTime(remainingSeconds);
      }
      if (this.totalTimeInSeconds <= 0) {
        clearInterval(interval);
        this.toast.success('Hết thời gian làm bài');
      }
    }, 1000);
  }

  formatTime(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }

  finishTest() {
    // const isNotSelectAll = this.checkSelectedAll();
    // const isNotSubmit = this.totalTimeInSeconds > 0;
    // if (isNotSelectAll && isNotSubmit) {
    //   const confirmModal: NzModalRef = this.modal.create({
    //     nzTitle: `Xác nhận`,
    //     nzContent: `Bạn chưa hoàn thành bài thi, bạn có muốn nộp bài không?`,
    //     nzCentered: true,
    //     nzFooter: [
    //       {
    //         label: 'Hủy',
    //         onClick: () => confirmModal.destroy()
    //       },
    //       {
    //         label: 'Đồng ý',
    //         type: 'primary',
    //         onClick: () => {
    //           this.submitTest();
    //           confirmModal.destroy();
    //         }
    //       }
    //     ]
    //   });
    // }
    const finishExamData = {
      examId: this.currentExam.examId,
      answers: this.mapAnswersToArray(),
      totalTime: this.totalTimeInSeconds,
    };
    this.http.post('/api/exam/finish-exam', {})
      .subscribe((res: any) => {
        if (res?.success) {
          console.log(res);
          this.toast.success('Nộp bài thành công');
        } else {
          this.toast.error(res?.message);
        }
      });
  }

  submitTest() {

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

  counter(i: number) {
    return new Array(i);
  }

  questionPart7HasAnswerCheck(questNumber: number, list: any) {
    return !!list.includes(questNumber);
  }


  changeStateButton(selectedAnswerValue: string, questionId: number) {
    this.selectedAnswer[questionId] = selectedAnswerValue;
    this.buttonStates[questionId] = true;
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
    this.listPart.forEach((part: any) => {
      part.questions.forEach((question: any) => {
        this.selectedAnswer[question.questionId] = '';
      });
    });
  }
  private mapAnswersToArray() {
    const answersArray = [];
    for (const questionId in this.selectedAnswer) {
      if (this.selectedAnswer.hasOwnProperty(questionId)) {
        answersArray.push({
          questionId: +questionId,
          answer: this.selectedAnswer[questionId],
        });
      }
    }
    return answersArray;
  }
}
