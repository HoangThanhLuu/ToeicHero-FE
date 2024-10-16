import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BsModalService} from "ngx-bootstrap/modal";
import {LoginComponent} from "../login/login.component";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  activeNav: string = 'home';

  ngOnInit(): void {
    this.activeHeader();
  }

  constructor(private bs: BsModalService, private http: HttpClient) {
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

}
