import {Component, HostListener, OnInit} from '@angular/core';
import {AdminLibBaseCss} from "./admin.style";
import {HttpClient} from "@angular/common/http";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {NgxSpinnerService} from "ngx-spinner";
import {finalize} from "rxjs";
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss',
    ...AdminLibBaseCss,
    './assets/css/style.css'
  ]
})
export class AdminComponent implements OnInit {
  isShow: boolean = false;
  canActivate: boolean = false;

  constructor(private http: HttpClient,
              private modal: NzModalService,
              private spinner: NgxSpinnerService,
              private translate: TranslateService) {
    this.translate.setDefaultLang('en_US');
    this.translate.use('en_US');
  }

  ngOnInit(): void {
    this.spinner.show().then(r => r);
    this.http.get('/api/admin/is-login')
      .pipe(
        finalize(() => this.spinner.hide())
      )
      .subscribe((res: any) => {
        if (res?.success) {
          if (!res?.data) {
            localStorage.removeItem('token');
            localStorage.removeItem('tokenValid');
            localStorage.removeItem('profile');
            this.showNotPermission();
            this.canActivate = false;
          } else {
            this.canActivate = true;
          }
        } else {
          this.showNotPermission();
          this.canActivate = false;
        }
      });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isShow = window.scrollY > 100;
  }

  scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  showNotPermission() {
    const confirmModal: NzModalRef = this.modal.create({
      nzTitle: `Vui lòng đăng nhập`,
      nzContent: `Bạn không có quyền admin, vui lòng dùng tài khoản admin để đăng nhập?`,
      nzCentered: true,
      nzFooter: [
        {
          label: 'Đồng ý',
          type: 'primary',
          onClick: () => {
            window.location.href = '/login';
            confirmModal.destroy();
          }
        }
      ]
    });
  }
}
