import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {BsModalService} from "ngx-bootstrap/modal";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {TranslateService} from "@ngx-translate/core";
import {finalize} from "rxjs";


@Component({
  selector: 'app-crawl',
  templateUrl: './crawl.component.html',
  styleUrls: ['./crawl.component.scss']
})
export class CrawlComponent implements OnInit {
  @Input() title: string = "Crawl Data: ";
  @Input() params = {
    email: '',
    url: ''
  }
  emails: any = [];
  showBorderError: boolean = false;

  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private bsModalService: BsModalService,
              private modal: NzModalService,
              private translate: TranslateService) {
  }

  getListConfigCrawl() {
    this.http.get('/api/admin/crawl/all-config')
      .subscribe((res: any) => {
        this.emails = res.map((item: { email: any; }) => item.email);
        this.params.email = this.emails[0];
      });
  }

  ngOnInit(): void {
    this.getListConfigCrawl();
  }

  getData() {
    if (!this.params.url) {
      this.toastr.error('Vui lòng nhập URL');
      this.showBorderError = true;
      return;
    } else {
      this.showBorderError = false;
    }
    this.spinner.show().then();
    this.http.post('/api/admin/crawl/is-crawl', this.params)
      .subscribe({
        next: (res: any) => {
          if (res.success) {
            this.spinner.hide();
            const confirmModal: NzModalRef = this.modal.create({
              nzTitle: `Xác nhận`,
              nzContent: `Đề này bạn đã Crawl. Bạn có muốn Crawl lại hay không?`,
              nzCentered: true,
              nzFooter: [
                {
                  label: 'Hủy',
                  onClick: () => confirmModal.destroy()
                }, {
                  label: 'Đồng ý',
                  type: 'primary',
                  onClick: () => {
                    this.crawlData();
                    confirmModal.destroy();
                  }
                }
              ]
            });
          } else {
            this.crawlData();
          }
        },
        error: (res: any) => {
          const msg = this.translate.instant(`CRAWL.${res?.message}`);
          this.toastr.error(msg);
          this.spinner.hide();
        }
      });

  }

  crawlData() {
    this.spinner.show().then();
    this.http.post('/api/admin/crawl/get-data', this.params)
      .subscribe({
        next: (res: any) => {
          const msg = this.translate.instant(`CRAWL.${res?.message}`);
          if (res?.success) {
            this.toastr.success(msg);
          } else {
            this.toastr.error(msg);
          }
          this.spinner.hide();
          this.params.url = '';
        },
        error: (res: any) => {
          const msg = this.translate.instant(`CRAWL.${res?.message}`);
          this.toastr.error(msg);
          this.spinner.hide();
        }
      });
  }

  onEmailChange(event: any) {
    this.params.email = event;
  }
}
