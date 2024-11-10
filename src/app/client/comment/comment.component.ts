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
    size: 10
  };
  listCmt: Comment[] = [];
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
              page: 0,
              size: 10,
              replies: []
            };
          });
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
      this.createCmt({content, parentId});
    } else {
      this.toast.error('Vui lòng đăng nhập để Bình luận');
      this.bsModalService.show(LoginComponent, {
        class: 'modal-lg modal-dialog-centered',
        initialState: {
          isNotDirect: true
        }
      });
    }
  }

  trackByFn(index: number, item: any): number {
    return item.id;
  }

  formatDistance(date: string): string {
    return formatDistance(new Date(date), new Date());
  }

  reply(c: Comment) {
    c.showReply = !c.showReply;
  }

  getListCommentByParent(commentId: number, page: number, size: number) {
    this.http.get(`/api/comment/get-by-parent?parentId=${commentId}&page=${page}&size=${size}`)
      .subscribe({
        next: (res: any) => {
          const comment = this.listCmt.find(c => c.commentId === commentId);
          if (comment) {
            const replies = res.content.map((item: Comment) => {
              return {
                ...item,
                showReply: false,
                contentReply: '',
                page: 0,
                size: 10,
                replies: []
              };
            });
            comment.replies = [...comment.replies, ...replies];
            comment.page++;
          }
        }
      });
  }
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
}

export interface User {
  avatar: string;
  fullName: string;
  userId: number;
}
