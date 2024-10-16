import {Component, Input, OnInit} from '@angular/core';
import {BsModalService} from "ngx-bootstrap/modal";
import {LoginComponent} from "../login/login.component";
import {AuthServiceService} from "../../auth-service.service";
import {GetHeaderService} from "../../common/get-headers/get-header.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  activeNav: string = 'home';
  isLogin: boolean = false;

  constructor(private bs: BsModalService, private getHeaderService: GetHeaderService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.activeHeader();
    const tokenValid = localStorage.getItem('tokenValid');
    this.isLogin = tokenValid === 'true';
  }


  openLogin() {
    this.bs.show(LoginComponent, {class: 'modal-lg modal-dialog-centered'});
  }

  activeHeader() {
    const url = window.location.href;
    if (url.includes('home')) {
      this.activeNav = 'home';
    } else if (url.includes('test')) {
      this.activeNav = 'test';
    } else if (url.includes('result')) {
      this.activeNav = 'result';
    } else if (url.includes('profile')) {
      this.activeNav = 'profile';
    } else if (url.includes('logout')) {
      this.activeNav = 'logout';
    }
  }


  logout() {
    localStorage.removeItem('token');
    window.location.href = '/home';
  }
}
