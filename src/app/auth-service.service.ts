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
import {BASE_URL} from "./common/constant";

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
    console.log(this.isDevelopMode )
    // handle if running on production
    if (this.isDevelopMode || window.location.href.includes('localhost')) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    } else {
      req = req.clone({
        url: apiEndPoint.href,
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(req);
  }
}
