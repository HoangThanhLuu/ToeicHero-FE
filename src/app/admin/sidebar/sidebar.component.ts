import {Component, OnInit} from '@angular/core';
import {AdminLibBaseCss2, AdminStyle} from "../admin.style";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css', ...AdminStyle, ...AdminLibBaseCss2]
})
export class SidebarComponent implements OnInit {

  navItemActive: string = 'dashboard';

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  this.getNavItems();

  }

  private getNavItems(): void {
    const url = window.location.href;
    if (url.includes('dashboard') || url.includes('home')) {
      this.navItemActive = 'dashboard';
    } else if (url.includes('users')) {
      this.navItemActive = 'users';
    } else if (url.includes('topic')) {
      this.navItemActive = 'topic';
    } else if (url.includes('exam') || url.includes('question')) {
      this.navItemActive = 'exam';
    }else if (url.includes('score')) {
      this.navItemActive = 'score';
    } else if (url.includes('logout')) {
      this.navItemActive = 'logout';
    } else if (url.includes('firebase')|| url.includes('update-firebase')) {
      this.navItemActive = 'firebase';
    }
  }


}
