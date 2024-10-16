import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {NzModalService} from "ng-zorro-antd/modal";
import {BsModalService} from "ngx-bootstrap/modal";
import {NgxSpinnerService} from "ngx-spinner";
import {GetHeaderService} from "../../../common/get-headers/get-header.service";
import {ActivatedRoute} from "@angular/router";
import {finalize} from "rxjs";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  @ViewChild('minutes', {static: true}) minutes: ElementRef | null = null;
  @ViewChild('seconds', {static: true}) seconds: ElementRef | null = null;
  totalTimeInSeconds: number = 1 * 60; // 120 minutes
  parts: number[] = [6, 25, 39, 30, 30, 16, 54];
  buttonStates: boolean[][] = [];
  currentExam: any;
  listPart: any = [];
  selectedIndex: number = 6;
  questionPart7Has2Answer: any = ['147', '149', '154', '156'];
  questionPart7Has3Answer: any = ['151', '166', '169'];
  questionPart7Has4Answer: any = ['158', '162', '172'];
  questionPart7Has2Paragraph: any = ['176', '181', '186', '191', '196'];

  constructor(private toast: ToastrService,
              private http: HttpClient,
              private modal: NzModalService,
              private bsModalService: BsModalService,
              private spinnerService: NgxSpinnerService,
              private getHeaderService: GetHeaderService,
              private route: ActivatedRoute) {
    this.initializeButtonStates();
  }

  ngOnInit(): void {
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

  }

  initializeButtonStates() {
    this.parts.forEach(partQuestions => {
      const partButtonStates: boolean[] = [];
      for (let i = 0; i < partQuestions; i++) {
        partButtonStates.push(false);
      }
      this.buttonStates.push(partButtonStates);
    });
  }

  goToPart(number: number) {

  }

  getPartQuestions(partIndex: number): number[] {
    const start = this.parts.slice(0, partIndex).reduce((acc, val) => acc + val, 0);
    return Array.from({length: this.parts[partIndex]}, (_, index) => start + index + 1);
  }

  goToQuestion(questionIndex: number) {

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
}
