import {Component, Input} from '@angular/core';

import {AdminLibBaseCss2, AdminStyle} from '../admin.style';
import {CONSTANT} from '../../common/constant';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', ...AdminLibBaseCss2, ...AdminStyle]
})
export class NavbarComponent {
  @Input() sidebarId: string = "sidebar";

  logout() {
    localStorage.removeItem('token');
    localStorage.setItem('tokenValid', 'false');
    localStorage.removeItem(CONSTANT.systemMenu);
    localStorage.removeItem(CONSTANT.memberMenu);

    window.location.href = '/home';
  }
}
