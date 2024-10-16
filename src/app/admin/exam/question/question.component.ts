import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AdminLibBaseCss3, AdminStyle2} from "../../admin.style";
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {NzModalService} from "ng-zorro-antd/modal";
import {BsModalService} from "ngx-bootstrap/modal";
import {NgxSpinnerService} from "ngx-spinner";
import {ActivatedRoute} from "@angular/router";
import {forkJoin} from "rxjs";
import {EditQuestionPart1Component} from "../edit-question-part1/edit-question-part1.component";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss',
    ...AdminLibBaseCss3,
    ...AdminStyle2
  ]
})
export class QuestionComponent implements OnInit {
  title: string = "Quản lý câu hỏi";
  currentPage: string = "Câu hỏi"
  listQuestion: any = [];
  currentPart: any;
  isValidNumberQuestionOfPart: boolean = false;
  @ViewChild('part1') part1: TemplateRef<any> | null = null;
  @ViewChild('part2') part2: TemplateRef<any> | null = null;
  @ViewChild('part34') part34: TemplateRef<any> | null = null;
  @ViewChild('part5') part5: TemplateRef<any> | null = null;
  @ViewChild('part6') part6: TemplateRef<any> | null = null;
  @ViewChild('part7') part7: TemplateRef<any> | null = null;
  @ViewChild('notFound') notFound: TemplateRef<any> | null = null;

  constructor(private toast: ToastrService,
              private http: HttpClient,
              private modal: NzModalService,
              private bsModalService: BsModalService,
              private spinnerService: NgxSpinnerService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getListQuestion();
  }

  openFormAdd() {

  }

  trackByFn(index: number, item: any): any {
    return item.questionId;
  }

  private getListQuestion() {
    this.spinnerService.show();
    this.route.queryParams.subscribe((params: any) => {
      const getCurrentPart = this.http.get(`/api/admin/part/find-by-id?partId=${params?.pid}`);
      const getListQuestionOfPart = this.http.get(`/api/admin/question/list-by-part?partId=${params?.pid}`);
      forkJoin([getCurrentPart, getListQuestionOfPart])
        .subscribe((res: any) => {
          this.spinnerService.hide();
          if (res?.[0]?.success && res?.[1]?.success) {
            this.currentPart = res?.[0]?.data;
            this.listQuestion = res?.[1]?.data;
            this.validNumberQuestionOfPart(this.currentPart, this.listQuestion);
          } else {
            this.toast.error('Không tìm thấy câu hỏi');
          }
        });
    });
  }

  openFormEdit(item: any) {
    const modalRef = this.bsModalService.show(EditQuestionPart1Component, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Cập nhật',
        question: item,
        currentPart: this.currentPart,
      }
    });
    if (modalRef && modalRef.content) {
      modalRef.content.addSuccessEmit.subscribe(() => {
        this.getListQuestion();
      });
    }
  }

  validNumberQuestionOfPart(part: any, listQuestion: any) {
    switch (part?.partCode) {
      case "PART1": {
        if (listQuestion && listQuestion.length == 6) {
          this.isValidNumberQuestionOfPart = true;
        }
        break;
      }
      case "PART2": {
        if (listQuestion && listQuestion.length == 25) {
          this.isValidNumberQuestionOfPart = true;
        }
        break;
      }
      case "PART3": {
        if (listQuestion && listQuestion.length == 39) {
          this.isValidNumberQuestionOfPart = true;
        }
        break;
      }
      case "PART4":
      case "PART5": {
        if (listQuestion && listQuestion.length == 30) {
          this.isValidNumberQuestionOfPart = true;
        }
        break;
      }
      case "PART6": {
        if (listQuestion && listQuestion.length == 16) {
          this.isValidNumberQuestionOfPart = true;
        }
        break;
      }
      case "PART7": {
        if (listQuestion && listQuestion.length == 54) {
          this.isValidNumberQuestionOfPart = true;
        }
        break;
      }
    }
  }

  backPreviousPage() {
    history.back();
  }

  getTemplatePartQuestion(): TemplateRef<any> | null {
    switch (this.currentPart?.partCode) {
      case "PART1":
        return this.part1;
      case "PART2":
        return this.part2;
      case "PART3":
      case "PART4":
        return this.part34;
      case "PART5":
        return this.part5;
      case "PART6":
        return this.part6;
      case "PART7":
        return this.part7;
      default:
        return this.notFound;
    }
  }
}
