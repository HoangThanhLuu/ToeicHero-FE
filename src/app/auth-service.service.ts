import {
  Injectable,
  isDevMode
} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "./auth.service";
import {BASE_URL, CONSTANT} from "./common/constant";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService implements HttpInterceptor {
  isDevelopMode: boolean = isDevMode();

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let apiEndPoint = new URL(req.url, BASE_URL);
    const token = this.authService.getToken();
    // handle if running on production
    if (this.isDevelopMode || window.location.href.includes('localhost') || req.url.includes('assets')) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    } else {
      const captcha = document.cookie.split(';').find((item: string) => item.includes(CONSTANT.captcha));
      req = req.clone({
        url: apiEndPoint.href,
        withCredentials: true,  // send cookie
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'Captcha': captcha ? captcha.split('=')[1] : ''
        }
      });
    }
    return next.handle(req);
  }
}
