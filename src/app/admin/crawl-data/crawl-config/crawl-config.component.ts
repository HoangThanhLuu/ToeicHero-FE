import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {BsModalService} from "ngx-bootstrap/modal";
import {TranslateService} from "@ngx-translate/core";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {finalize} from "rxjs";
import {UpdateConfigCrawlComponent} from "./update-config-crawl/update-config-crawl.component";

@Component({
  selector: 'app-crawl-config',
  templateUrl: './crawl-config.component.html',
  styleUrls: ['./crawl-config.component.scss']
})
export class CrawlConfigComponent implements OnInit{
  title: string = "Crawl Config";
  currentPage: string = "Config";


  listConfigCrawl:any =[];
  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private bsModalService: BsModalService,
              private modal : NzModalService,
              private translate: TranslateService) {
  }
  getListConfigCrawl() {
    this.http.get('/api/admin/crawl/all-config')
      .subscribe((res: any) => {
        this.listConfigCrawl = res;
      });
  }

  ngOnInit(): void {
    this.getListConfigCrawl();
  }
  deleteFirebase(id: number) :void {
    const confirmModal: NzModalRef = this.modal.create({
      nzTitle: `Xác nhận`,
      nzContent: `Bạn có muốn xóa Config này không?`,
      nzCentered: true,
      nzFooter: [
        {
          label: 'Hủy',
          onClick: () => confirmModal.destroy()
        }, {
          label: 'Đồng ý',
          type: 'primary',
          onClick: () => {
            this.spinner.show().then()
            this.http.delete(`/api/admin/crawl/remove-config/${id}`)
              .pipe(
                finalize(() => {
                  this.getListConfigCrawl();
                })
              )
              .subscribe({
                next: (res: any) => {
                  const msg = this.translate.instant(`CRAWL.${res?.message}`);
                  this.toastr.success(msg);
                  this.spinner.hide().then();
                  confirmModal.destroy();
                },
                error: (res: any) => {
                  const msg = this.translate.instant(`CRAWL.${res?.message}`);
                  this.toastr.error(msg);
                  this.spinner.hide().then();
                }
              });
          }
        }
      ]
    });
  }
  update(data: any) {
    const bsModalResult = this.bsModalService.show(UpdateConfigCrawlComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Cập nhật Config Crawl',
        isAdd: false,
        isPopup: true,
        params: {
          id: data.id,
          email: data.email,
          token: data.token,
          agentUser: data.agentUser
        }
      }
    });
    if (bsModalResult?.content?.added){
      bsModalResult.content.added.subscribe(() => {
        this.getListConfigCrawl();
      });
    }
  }
  openFormAdd() {
    const bsModalRef = this.bsModalService.show(UpdateConfigCrawlComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Thêm Config Crawl',
        isPopup: true
      }
    });
    if (bsModalRef && bsModalRef.content) {
      bsModalRef.content.addSuccessEmit.subscribe(() => {
        this.getListConfigCrawl();
      });
    }
  }
}
