import {AfterViewInit, Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html'
})
export class RedirectComponent implements AfterViewInit {
  constructor(private route: ActivatedRoute) {
  }

  token: string = '';

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      localStorage.setItem('token', this.token);
      localStorage.setItem('tokenValid', 'true');
      window.location.href = '/home';
    });
  }
}
