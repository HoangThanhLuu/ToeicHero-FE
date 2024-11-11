import {
  Component,
  OnInit
} from '@angular/core';
import {
  AdminLibBaseCss2,
  AdminStyle
} from "../admin.style";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css', ...AdminStyle, ...AdminLibBaseCss2]
})
export class SidebarComponent implements OnInit {
  listMenu: MenuGroup[] = [];
  listMemberMenu: MenuGroup[] = [];
  listSystemMenu: MenuGroup[] = [];
  listMenuGroupBlank: number[] = [9];
  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getMenus();
  }

  getMenus(): void {
    this.http.get<MenuGroup[]>('api/left-menu/get')
      .subscribe(data => {
        this.listMenu = data;
        this.listMemberMenu = data.filter(menu => menu.type === 'MEMBER');
        this.listSystemMenu = data.filter(menu => menu.type === 'SYSTEM');
      });
  }

  expendMenu(menu: MenuGroup) {
    menu.expanded = !menu.expanded;
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
