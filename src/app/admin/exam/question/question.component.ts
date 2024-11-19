import {Component, OnInit} from '@angular/core';
import {AdminLibBaseCss3, AdminStyle2} from '../../admin.style';
import {ToastrService} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {BsModalService} from 'ngx-bootstrap/modal';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute} from '@angular/router';
import {finalize, forkJoin} from 'rxjs';
import {EditQuestionPart1Component} from '../edit-question-part1/edit-question-part1.component';
import {EditQuestionPart34Component} from '../edit-question-part34/edit-question-part34.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss',
    ...AdminLibBaseCss3,
    ...AdminStyle2
  ]
})
export class QuestionComponent implements OnInit {
  title: string = 'Quản lý câu hỏi';
  titleShow = '';
  currentPage: string = 'Câu hỏi'
  listQuestion: QuestionModel[] = [];
  currentPart: PartModel = new PartModel();
  fallback =
    '/assets/images/fallback.png';

  constructor(private toast: ToastrService,
              private http: HttpClient,
              private bsModalService: BsModalService,
              private spinnerService: NgxSpinnerService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getListQuestion();
  }

  openFormAdd() {

  }

  getListQuestion() {
    this.spinnerService.show();
    this.route.queryParams.subscribe((params: any) => {
      const getCurrentPart = this.http.get(`/api/admin/part/find-by-id?partId=${params?.pid}`);
      const getListQuestionOfPart = this.http.get(`/api/admin/question/list-by-part?partId=${params?.pid}`);
      forkJoin([getCurrentPart, getListQuestionOfPart])
        .pipe(finalize(() => {
          this.spinnerService.hide();
        }))
        .subscribe((res: any) => {
          if (res?.[0]?.success && res?.[1]?.success) {
            this.currentPart = res?.[0]?.data;
            this.listQuestion = res?.[1]?.data;
            this.titleShow = `${this.title} - ${this.currentPart?.partName}`;
          } else {
            this.toast.error('Không tìm thấy câu hỏi');
          }
        });
    });
  }

  openFormEditPart12(item: any) {
    const modalRef = this.bsModalService.show(EditQuestionPart1Component, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Cập nhật',
        question: item,
        currentPart: this.currentPart,
      }
    });
    if (modalRef?.content) {
      modalRef.content.addSuccessEmit.subscribe(() => {
        this.getListQuestion();
      });
    }
  }

  backPreviousPage() {
    history.back();
  }

  openFormEditPart34(item: any) {
    const modalRef = this.bsModalService.show(EditQuestionPart34Component, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Cập nhật',
        question: item,
        currentPart: this.currentPart,
      }
    });
    if (modalRef?.content) {
      modalRef.content.addSuccessEmit.subscribe(() => {
        this.getListQuestion();
      });
    }
  }

  openFormEdit5(item: any) {

  }

  openFormEdit67(item: any) {

  }

  protected readonly PartCode = PartCode;
}


export class QuestionModel {
  answerA: string = '';
  answerB: string = '';
  answerC: string = '';
  answerD: string = '';
  correctAnswer: string = '';
  haveMultiImage: boolean = false;
  numberQuestionInGroup: number = 0;
  questionAudio: string = '';
  questionContent: string = '';
  questionHaveTranscript: boolean = false;
  questionId: number = 0;
  questionImage: string = '';
  questionNumber: number = 0;
  transcript: string = '';
  translateTranscript: string = '';
  paragraph1: string = '';
  paragraph2: string = '';
  questionImages: QuestionImage[] = [];
}

export interface QuestionImage {
  questionImageId: number;
  questionImage: string;
}


export class PartModel {
  partId: number = 0;
  partImage: string = '';
  partName: string = '';
  partCode: string | null = '';
  partAudio: string = '';
}

export enum PartCode {
  PART1 = 'part1',
  PART2 = 'part2',
  PART3 = 'part3',
  PART4 = 'part4',
  PART5 = 'part5',
  PART6 = 'part6',
  PART7 = 'part7',
}
