import {Component, OnInit} from '@angular/core';
import {BsModalService} from "ngx-bootstrap/modal";
import {HttpClient} from "@angular/common/http";
import {NzModalService} from "ng-zorro-antd/modal";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import {UpdateKommunicateComponent} from "./update-kommunicate/update-kommunicate.component";
import {finalize} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {UpdateEmailComponent} from "../email/update-email/update-email.component";

@Component({
  selector: 'app-kommunicate',
  templateUrl: './kommunicate.component.html',
  styleUrls: ['./kommunicate.component.scss']
})
export class KommunicateComponent implements OnInit{
  title: string = "Quản lý tài khoản Kommunicate";
  currentPage: string = "Kommunicate";
  listKommunicate: any = [];
  private KommunicateIdToDelete: number | undefined;
  isVisible: boolean =false

  constructor(
    private bsModalService: BsModalService,
    private http: HttpClient,
    private modal: NzModalService,
    private spinner: NgxSpinnerService,
    private  translate: TranslateService,
    private toast: ToastrService
  ) {
  }
  ngOnInit(): void {
    this.getListKommunicate();
  }
  getListKommunicate() {
    this.http.get('/api/kommunicate/account/all')
      .subscribe((res: any) => {
        this.listKommunicate = res;
      });
  }
  handleOk(): void {
    if (this.KommunicateIdToDelete) {
      this.deleteKommunicate(this.KommunicateIdToDelete);
    }
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  showConfirm(id: number): void {
    this.KommunicateIdToDelete = id;
    this.isVisible = true;
  }
  deleteKommunicate(id: number): void {
    this.spinner.show().then()
    this.http.delete(`/api/kommunicate/account/delete/${id}`)
      .pipe(
        finalize(() => {
          this.getListKommunicate();
        })
      )
      .subscribe({
        next: (res: any) => {
          const msg = this.translate.instant(`KOMMUNICATE.${res?.message}`);
          this.toast.success(msg);
          this.spinner.hide().then();
        },
        error: (res: any) => {
          const msg = this.translate.instant(`KOMMUNICATE.${res?.message}`);
          this.toast.success(msg);
          this.spinner.hide().then();
        }
      });
  }
  update(data: any) {
    const bsModalResult = this.bsModalService.show(UpdateKommunicateComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Cập nhật Kommunicate Account ',
        isAdd: false,
        param: {
          email: data.email,
          password: data.password
        }
      }
    });
    if (bsModalResult?.content?.added){
      bsModalResult.content.added.subscribe(() => {
        this.getListKommunicate();
      });
    }
  }
  openFormAdd() {
    const bsModalRef = this.bsModalService.show(UpdateKommunicateComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Thêm Kommunicate'
      }
    });
    if (bsModalRef && bsModalRef.content) {
      bsModalRef.content.addSuccessEmit.subscribe(() => {
        this.getListKommunicate();
      });
    }
  }
}
