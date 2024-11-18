import {Component, OnInit} from '@angular/core';
import {BsModalService} from "ngx-bootstrap/modal";
import {LoginComponent} from "../login/login.component";
import {AuthService} from "../../auth.service";
import {ProfileService} from "../../common/profile.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  avatar: string = '/assets/images/default-avatar.jpg';
  activeNav: string = 'home';
  isLogin: boolean = false;
  listNav: string[] = ['home', 'list-test', 'my-exam', 'blog', 'pricing', 'tests', 'chat', 'course'];
  userVip: boolean = false;

  constructor(private bs: BsModalService,
              private auth: AuthService,
              private router: Router,
              protected profileService: ProfileService) {
  }

  ngOnInit(): void {
    this.activeHeader();
    const token = this.auth.getToken();
    this.isLogin = token ? !this.auth.isTokenExpired(token) : false;
    if (this.isLogin) {
      this.profileService.getProfileData().subscribe({
        next: (res: any) => {
          if (res) {
            this.userVip = res?.userType === 'VIP_USER';
          }
        }
      });
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

  directLink(link: string, activeNavbar: string) {
    this.activeNav = activeNavbar;
    this.router.navigate([`${link}`]).then();
  }


  logout() {
    localStorage.removeItem('token');
    localStorage.setItem('tokenValid', 'false');
    localStorage.removeItem('profile');
    window.location.href = '/home';
  }

  protected readonly window = window;
}
