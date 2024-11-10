import {Component, Input, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {NgxSpinnerService} from "ngx-spinner";
import {TranslateService} from "@ngx-translate/core";
import {LoginComponent} from "../login/login.component";
import {BsModalService} from "ngx-bootstrap/modal";
import {ProfileService} from "../../common/profile.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit{
  @Input() exam: number = 0;
  params: any = {
    content: '',
    parentId: '',
    page : 1,
    size : 10
  };
  listCmt: any = [];
  submitting: boolean = false;

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
    this.http.get(`/api/comment/get-by-exam?examId=${this.exam}`)
      .subscribe({
        next: (res: any) => {
          this.listCmt = res.content;
          console.log(this.listCmt);
        }
      })
  }

  createCmt() {
    this.http.post(`/api/comment/create`, {
      ...this.params,
      examId: this.exam
    })
      .subscribe({
        next: (res: any) => {
          const msg = this.translate.instant(`CMT.${res?.message}`);
          this.toast.success(msg);
          this.spinnerService.hide();
        },
        error: (res: any) => {
          const msg = this.translate.instant(`CMT.${res?.message}`);
          this.toast.error(msg);
          this.spinnerService.hide();
        }
      })
  }

  checkLoginBeforeCmt() {
    this.http.get('/api/user/get-profile')
      .subscribe((res: any) => {
        if (res?.success) {
          this.createCmt();
        } else {
          this.toast.error('Vui lòng đăng nhập để Bình luận');
          this.bsModalService.show(LoginComponent, {
            class: 'modal-lg modal-dialog-centered',
            initialState: {
              isNotDirect: true
            }
          });
        }
      });
  }

  trackByFn(index: number, item: any): number {
    return item.id;
  }
}
