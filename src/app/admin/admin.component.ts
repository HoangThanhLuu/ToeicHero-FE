import {Component, HostListener, OnInit} from '@angular/core';
import {AdminLibBaseCss} from "./admin.style";
import {HttpClient} from "@angular/common/http";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {NgxSpinnerService} from "ngx-spinner";
import {distinctUntilChanged, finalize} from "rxjs";
import {TranslateService} from '@ngx-translate/core';
import {CONSTANT} from '../common/constant';
import {Router} from '@angular/router';

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
  listMemberMenu: MenuGroup[] = [];
  listSystemMenu: MenuGroup[] = [];
  listMenuGroupBlank: number[] = [9];

  constructor(private http: HttpClient,
              private modal: NzModalService,
              private spinner: NgxSpinnerService,
              private router: Router,
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
            const memberMenu = JSON.parse(localStorage.getItem(CONSTANT.memberMenu) ?? '[]');
            const systemMenu = JSON.parse(localStorage.getItem(CONSTANT.systemMenu) ?? '[]');

            if (memberMenu.length > 0 && systemMenu.length > 0) {
              this.listMemberMenu = [...memberMenu];
              this.listSystemMenu = [...systemMenu];

              this.listSystemMenu.forEach((mn: MenuGroup) => {
                mn.leftMenus = mn.leftMenus.sort((a, b) => a.leftMenuId - b.leftMenuId);
              });

              this.listMemberMenu.forEach((mn: MenuGroup) => {
                mn.leftMenus = mn.leftMenus.sort((a, b) => a.leftMenuId - b.leftMenuId);
              });

            } else {
              this.http.get<MenuGroup[]>('api/left-menu/get')
                .pipe(distinctUntilChanged())
                .subscribe(data => {
                  const memberMenu = data.filter(menu => menu.type === 'MEMBER');
                  const systemMenu = data.filter(menu => menu.type === 'SYSTEM');

                  this.listMemberMenu = [...memberMenu];
                  this.listSystemMenu = [...systemMenu];

                  localStorage.setItem(CONSTANT.memberMenu, JSON.stringify(memberMenu));
                  localStorage.setItem(CONSTANT.systemMenu, JSON.stringify(systemMenu));
                });
            }
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

  expendMenu(menu: MenuGroup) {
    menu.expanded = !menu.expanded;
  }

  openTab(path: string) {
    if (path.includes('api/applications')) {
      window.open(path, '_blank');
      return;
    }
    this.router.navigateByUrl(path).then();
  }
}

export interface MenuGroup {
  menuGroupId: number;
  path: string;
  displayName: string;
  roles: string;
  icon: string;
  priority: number;
  haveChild: boolean;
  type: string;
  active: boolean;
  expanded: boolean;
  leftMenus: LeftMenuItem[];
}

export interface LeftMenuItem {
  leftMenuId: number;
  displayName: string;
  path: string;
  roles: string;
}
