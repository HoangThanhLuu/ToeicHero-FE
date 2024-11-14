import {
  Component,
  OnInit
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgxSpinnerService} from "ngx-spinner";
import {CONSTANT} from '../../common/constant';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html'
})
export class RedirectComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private spin: NgxSpinnerService) {
  }

  token: string = '';

  ngOnInit(): void {
    this.spin.show().then();
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      localStorage.setItem('token', this.token);
      localStorage.setItem('tokenValid', 'true');
      // get direct link from cookie
      const directLink = document.cookie.split(';').find((item: string) => item.includes(CONSTANT.directLink));
      // remove cookie direct link
      document.cookie = `${CONSTANT.directLink}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      window.location.href = directLink ? directLink.split('=')[1] : '/home';
    });
  }
}
