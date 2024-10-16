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


  }

  private getNavItems(): void {
    const url = window.location.href;
    if (url.includes('dashboard') || url.includes('home')) {
      this.navItemActive = 'dashboard';
    } else if (url.includes('users')) {
      this.navItemActive = 'users';
    } else if (url.includes('topic')) {
      this.navItemActive = 'topic';
    } else if (url.includes('exam')) {
      this.navItemActive = 'exam';
    } else if (url.includes('question')) {
      this.navItemActive = 'question';
    } else if (url.includes('profile')) {
      this.navItemActive = 'profile';
    } else if (url.includes('logout')) {
      this.navItemActive = 'logout';
    }
  }


}
