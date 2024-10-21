import {Component, OnInit} from '@angular/core';
import {BsModalService} from "ngx-bootstrap/modal";
import {HttpClient} from "@angular/common/http";
import {NzModalService} from "ng-zorro-antd/modal";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import {finalize} from "rxjs";
import {UpdateKommunicateComponent} from "../kommunicate/update-kommunicate/update-kommunicate.component";
import {UpdateEmailComponent} from "./update-email/update-email.component";


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
  title: string = "Quản lý email";
  currentPage: string = "Email";
  listEmailConfig: any = [];
  private emailIdToDelete: number | undefined;
  isVisible: boolean =false

  constructor(
    private bsModalService: BsModalService,
    private http: HttpClient,
    private modal: NzModalService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService
  ) {
  }
  ngOnInit(): void {
    this.getListEmailConfig();
  }
  getListEmailConfig() {
    this.http.get('/api/email/config/all')
      .subscribe((res: any) => {
        this.listEmailConfig = res;
      });
  }
  handleOk(): void {
    if (this.emailIdToDelete) {
      this.deleteEmail(this.emailIdToDelete);
    }
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  showConfirm(id: number): void {
    this.emailIdToDelete = id;
    this.isVisible = true;
  }
  deleteEmail(id: number): void {
    this.spinner.show().then()
    this.http.delete(`/api/email/config/delete/${id}`)
      .pipe(
        finalize(() => {
          this.listEmailConfig();
        })
      )
      .subscribe({
        next: () => {
          this.toast.success(' Xóa Thành công');
          this.spinner.hide().then();
        },
        error: () => {
          this.toast.error('Xóa thất bại');
          this.spinner.hide().then();
        }
      });
  }
  update(data: any) {
    this.bsModalService.show(UpdateEmailComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Cập nhật tài khoản Email ',
        isAdd: false,
        params: {
          host: data.host,
          port: data.port,
          email: data.email,
          password: data.password
        }
      }
    });
    console.log(data)
    this.getListEmailConfig();
  }

}
