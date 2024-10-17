import {Component, Input} from '@angular/core';

import {AdminLibBaseCss2, AdminStyle} from "../admin.style";

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
    window.location.href = '/home';
  }
}
