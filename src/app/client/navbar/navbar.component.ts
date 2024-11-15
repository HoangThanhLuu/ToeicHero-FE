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
  listNav: string[] = ['home', 'test', 'my-exam', 'blog', 'pricing'];

  constructor(private bs: BsModalService,
              private auth: AuthService,
              protected profileService: ProfileService) {
  }

  ngOnInit(): void {
    this.activeHeader();
    const token = this.auth.getToken();
    this.isLogin = token ? !this.auth.isTokenExpired(token) : false;
    if (this.isLogin) {
      this.profileService.getProfileData().subscribe();
    }
  }


  openLogin() {
    this.bs.show(LoginComponent, {class: 'modal-lg modal-dialog-centered'});
  }

  activeHeader() {
    const url = window.location.href;
    this.listNav.forEach(nav => {
      if (url.includes(nav)) {
        this.activeNav = nav;
      }
    });
  }


  logout() {
    localStorage.removeItem('token');
    localStorage.setItem('tokenValid', 'false');
    localStorage.removeItem('profile');
    window.location.href = '/home';
  }
}
