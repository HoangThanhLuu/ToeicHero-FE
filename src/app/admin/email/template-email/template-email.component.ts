import {
  Component,
  OnInit
} from '@angular/core';
import { BsModalService} from 'ngx-bootstrap/modal';
import {HttpClient} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {TemplateEmailDetailComponent} from './template-email-detail/template-email-detail.component';
import {UpdateTemplateEmailComponent} from './update-template-email/update-template-email.component';
import {finalize} from 'rxjs';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-template-email',
  templateUrl: './template-email.component.html',
  styleUrls: ['./template-email.component.scss']
})
export class TemplateEmailComponent implements OnInit {
  title: string = 'Quản lý Template Email';
  currentPage: string = 'Template Email';
  listTemplateEmail: any = [];

  constructor(
    private bsModalService: BsModalService,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private modal: NzModalService
  ) {
  }

  ngOnInit(): void {
    this.getListTemplateEmail();
  }

  getListTemplateEmail() {
    this.http.get('/api/email/template/all')
      .subscribe((res: any) => {
        this.listTemplateEmail = res;
      });
  }

  openDetail(data: any) {
    this.bsModalService.show(TemplateEmailDetailComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        templateContent: data.templateContent
      }
    });
  }
  update(data: any) {
    const bsModalResult = this.bsModalService.show(UpdateTemplateEmailComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Chỉnh sửa Email Template',
        isAdd: false,
        params: {
          name : data.name,
          templateCode: data.templateCode,
          subject: data.subject,
          templateContent: data.templateContent
        }
      }
    });

  }
  deleteTemplate(id: any){
    const confirmModal: NzModalRef = this.modal.create({
      nzTitle: `Xác nhận`,
      nzContent: `Bạn có muốn xóa slider này không?`,
      nzCentered: true,
      nzFooter: [
        {
          label: 'Hủy',
          onClick: () => confirmModal.destroy()
        }, {
          label: 'Đồng ý',
          type: 'primary',
          onClick: () => {
            this.spinner.show();
            this.http.delete(`/api/email/template/delete/${id}`)
              .pipe(
                finalize(() => {
                  this.getListTemplateEmail();
                })
              )
              .subscribe({
                next: (res: any) => {
                  const msg = this.translate.instant(`EMAIL.${res?.message}`);
                  this.toastr.success(msg);
                  this.spinner.hide().then();
                },
                error: (res: any) => {
                  const msg = this.translate.instant(`EMAIL.${res?.message}`);
                  this.toastr.success(msg);
                  this.spinner.hide().then();
                }
              });
          }
        }
      ]
    });
  }
  openFormAdd() {
    const bsModalRef = this.bsModalService.show(UpdateTemplateEmailComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Thêm Template Email'
      }
    });
    if (bsModalRef && bsModalRef.content) {
      bsModalRef.content.added.subscribe(() => {
        this.getListTemplateEmail();
      });
    }
  }
}
