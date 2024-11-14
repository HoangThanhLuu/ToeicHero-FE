import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
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
  fallback =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg==';

  listHaveAudio: any = [];
  mapListPart: any;

  constructor(private toast: ToastrService,
              private http: HttpClient,
              private bsModalService: BsModalService,
              private spinnerService: NgxSpinnerService,
              private route: ActivatedRoute) {
    for (let i = 32; i < 101; i += 3) {
      this.listHaveAudio.push(`${i}`);
    }
  }

  ngOnInit(): void {
    this.getListQuestion();
    this.mapListPart = {
      'PART1': this.part1,
      'PART2': this.part2,
      'PART3': this.part34,
      'PART4': this.part34,
      'PART5': this.part5,
      'PART6': this.part6,
      'PART7': this.part7,
    };
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
        .pipe(finalize(() => {
          this.spinnerService.hide();
        }))
        .subscribe((res: any) => {
          if (res?.[0]?.success && res?.[1]?.success) {
            this.currentPart = res?.[0]?.data;
            this.listQuestion = res?.[1]?.data;
            this.validNumberQuestionOfPart(this.currentPart, this.listQuestion);
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

  validNumberQuestionOfPart(part: any, listQuestion: any) {
    const partCodeToLengthMap = {
      'PART1': 6,
      'PART2': 25,
      'PART3': 39,
      'PART4': 30,
      'PART5': 30,
      'PART6': 16,
      'PART7': 54
    };
    const expectedLength = partCodeToLengthMap[part?.partCode as keyof typeof partCodeToLengthMap];
    this.isValidNumberQuestionOfPart = listQuestion?.length === expectedLength;
  }

  backPreviousPage() {
    history.back();
  }

  getTemplatePartQuestion(): TemplateRef<any> | null {
    return this.mapListPart[this.currentPart?.partCode] || this.notFound;
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

  isQuestionOfPart34HasAudio(question: any) {
    return this.listHaveAudio.includes(question?.questionNumber);
  }

  isQuestionOfPart34HasImage(question: any) {
    return question?.questionNumber == 62
      || question?.questionNumber == 65
      || question?.questionNumber == 68
      || question?.questionNumber == 95
      || question?.questionNumber == 98;
  }
}
