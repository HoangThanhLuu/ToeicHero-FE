import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {TranslateService} from '@ngx-translate/core';
import {LoginComponent} from '../login/login.component';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ProfileService} from '../../common/profile.service';
import {finalize} from 'rxjs';
import {formatDistance} from 'date-fns';
import {badWords} from '../../common';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() exam: number = 0;
  params: any = {
    content: '',
    parentId: '',
    page: 1,
    size: 10,
    total: 0
  };
  listCmt: Comment[] = [];
  originalCmt: Comment[] = [];
  submitting: boolean = false;

  likes = 0;
  dislikes = 0;
  time = formatDistance(new Date(), new Date());

  constructor(private toast: ToastrService,
              private http: HttpClient,
              private bsModalService: BsModalService,
              protected profileService: ProfileService,
              private spinnerService: NgxSpinnerService,
              private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.getCmtByExam();
  }

  getCmtByExam() {
    this.http.get<Comment>(`/api/comment/get-by-exam?examId=${this.exam}&page=${this.params.page - 1}&size=${this.params.size}`)
      .subscribe({
        next: (res: any) => {
          this.listCmt = res.content.map((item: Comment) => {
            return {
              ...item,
              showReply: false,
              contentReply: '',
              totalPage: res.totalPages,
              page: 1,
              size: 10,
              replies: []
            };
          });
          this.originalCmt.forEach(oc => {
            // check if origin comment is expended then expend the same comment in listCmt
            const c = this.listCmt.find(c => c.commentId === oc.commentId);
            if (c) {
              c.replies = [...oc.replies];
              c.page = oc.page;
              c.size = oc.size;
            }
          });
          this.originalCmt = [...this.listCmt];
          this.params.total = res.totalElements;
        }
      });
  }

  createCmt(body: any) {
    this.spinnerService.show().then();
    this.submitting = true;
    this.http.post(`/api/comment/create`, {
      ...body,
      examId: this.exam
    })
      .pipe(
        finalize(() => {
          this.submitting = false;
          this.getCmtByExam();
        })
      )
      .subscribe({
        next: (res: any) => {
          const msg = this.translate.instant(`CMT.${res?.message}`);
          this.toast.success(msg);
          const cmt = this.listCmt.find(c => c.commentId === res?.data);
          this.getListCommentByParent(cmt?.commentId ?? 0, cmt?.page ?? 1, Number(cmt?.size) + 1 || 10);
          this.params.content = '';
          this.params.parentId = '';
          this.spinnerService.hide().then();
        },
        error: (res: any) => {
          const msg = this.translate.instant(`CMT.${res?.message}`);
          this.toast.error(msg);
          this.spinnerService.hide().then();
        }
      })
  }

  checkLoginBeforeCmt(content: string, parentId: number) {
    if (this.profileService.isLogin) {
      this.createCmt({content: badWords(content, {replacement: '*'}), parentId});
    } else {
      this.toast.error('Vui lòng đăng nhập để bình luận');
      this.bsModalService.show(LoginComponent, {
        class: 'modal-lg modal-dialog-centered',
        initialState: {
          isNotDirect: true
        }
      });
    }
  }

  formatDistance(date: string): string {
    return formatDistance(new Date(date), new Date());
  }

  reply(c: Comment) {
    c.showReply = !c.showReply;
  }

  getListCommentByParent(commentId: number, page: number, size: number) {
    this.http.get(`/api/comment/get-by-parent?parentId=${commentId}&page=${page - 1}&size=${size}`)
      .subscribe({
        next: (res: any) => {
          const comment = this.listCmt.find(c => c.commentId === commentId);
          if (comment) {
            const replies = res.content.map((item: Comment) => {
              return {
                ...item,
                showReply: false,
                contentReply: '',
                page: 1,
                size: 10,
                replies: []
              };
            });
            comment.replies = [...replies];
            comment.totalPage = res.totalPages;
            comment.size = size;

            this.originalCmt = [...this.listCmt];
          }
        }
      });
  }

  pageIndexChange($event: number) {
    this.params.page = $event;
    this.getCmtByExam();
  }

  pageSizeChange($event: number) {
    this.params.size = $event;
    this.getCmtByExam();
  }

  reduceComment(commentId: any) {
    const comment = this.listCmt.find(c => c.commentId === commentId);
    if (comment) {
      comment.replies = [];
      comment.page = 1;
      comment.size = 10;
      comment.totalPage = 0;
      this.originalCmt = [...this.listCmt];
    }
  }

  protected readonly Number = Number;
}


export interface Comment {
  commentId: number;
  content: string;
  createdAt: string;
  numberOfReplies: number;
  status: string;
  user: User;
  showReply: boolean;
  contentReply: string;
  page: number;
  size: number;
  parent: Comment;
  replies: Comment[];
  totalPage: number;
}

export interface User {
  avatar: string;
  fullName: string;
  userId: number;
}
