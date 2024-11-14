import {Component, OnInit} from '@angular/core';
import {BsModalService} from "ngx-bootstrap/modal";
import {LoginComponent} from "../login/login.component";
import {AuthService} from "../../auth.service";
import {ProfileService} from "../../common/profile.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  avatar: string = '/assets/images/default-avatar.jpg';
  activeNav: string = 'home';
  isLogin: boolean = false;

  constructor(private bs: BsModalService,
              private auth: AuthService,
              protected profileService: ProfileService) {
  }

  ngOnInit(): void {
    this.activeHeader();
    const token = this.auth.getToken();
    this.isLogin = token ? !this.auth.isTokenExpired(token) : false;
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
    } else if (url.includes('my-exam')) {
      this.activeNav = 'my-exam';
    }
  }


  logout() {
    localStorage.removeItem('token');
    localStorage.setItem('tokenValid', 'false');
    localStorage.removeItem('profile');
    window.location.href = '/home';
  }
}
