import {Component, OnInit} from '@angular/core';
import {finalize} from "rxjs";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {HttpClient} from "@angular/common/http";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {UpdateConfigComponent} from "./update-config/update-config.component";
import {UpdateEmailComponent} from "../../email/update-email/update-email.component";

@Component({
  selector: 'app-config-revai',
  templateUrl: './config-revai.component.html',
  styleUrls: ['./config-revai.component.scss']
})
export class ConfigRevaiComponent implements OnInit{
  title: string = "Config Rev-Ai";
  currentPage: string = "Config Rev-Ai";
  listConfig: any = [];
  private configIdToDelete: number | undefined;
  isVisible: boolean =false

  constructor(
    private bsModalService: BsModalService,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private  translate: TranslateService,
    private bsModalRef: BsModalRef
  ) {
  }
  ngOnInit(): void {
    this.getListConfigRevai();
  }
  getListConfigRevai() {
    this.http.get('/api/revai/config/all')
      .subscribe((res: any) => {
        this.listConfig = res;
      });
  }


  onSwitchChange(id: number) {
    this.spinner.show();
    this.http.patch(`api/revai/config/update/status/${id}`, {})
      .pipe(
        finalize(() => {
          this.getListConfigRevai()
        })
      )
      .subscribe( {
        next: (res: any)  => {
          const msg = this.translate.instant(`REVAI.${res?.message}`);
          this.toastr.success(msg);
          this.spinner.hide().then();
        },
        error: (res: any) => {
          const msg = this.translate.instant(`REVAI.${res?.message}`);
          this.toastr.success(msg);
          this.spinner.hide().then();
        }
      })
  }
  update(data: any) {
    const bsModalResult = this.bsModalService.show(UpdateConfigComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Cập nhật Config REV-AI ',
        isAdd: false,
        params: {
          id: data.id,
          accessToken: data.accessToken
        }
      },
      backdrop: "static"

    });
    if (bsModalResult?.content?.added){
      bsModalResult.content.added.subscribe(() => {
        this.getListConfigRevai();
      });
    }
  }
  handleOk(): void {
    if (this.configIdToDelete) {
      this.deleteConfigRev(this.configIdToDelete);
    }
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  showConfirm(id: number): void {
    this.configIdToDelete = id;
    this.isVisible = true;
  }
  deleteConfigRev(id: number) :void {
    this.spinner.show().then()
    this.http.delete(`/api/revai/config/delete/${id}`)
      .pipe(
        finalize(() => {
          this.getListConfigRevai();
        })
      )
      .subscribe({
        next: (res: any) => {
          const msg = this.translate.instant(`REVAI.${res?.message}`);
          this.toastr.success(msg);
          this.spinner.hide().then();
        },
        error: (res: any) => {
          const msg = this.translate.instant(`REVAI.${res?.message}`);
          this.toastr.error(msg);
          this.spinner.hide().then();
        }
      });
  }
  openFormAdd() {
    const bsModalRef = this.bsModalService.show(UpdateConfigComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Thêm Rev-AI Config'
      }
    });
    if (bsModalRef && bsModalRef.content) {
      bsModalRef.content.addSuccessEmit.subscribe(() => {
        this.getListConfigRevai();
      });
    }
  }
}