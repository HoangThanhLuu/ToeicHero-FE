import {Injectable} from '@angular/core';
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
  authenList: string[] = ['profile', 'start', 'result', 'practice', 'admin'];

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // for (const authenItem of this.authenList) {
    //   if (req.url.includes(authenItem)) {
    //     isAuthen = true;
    //     const token = this.authService.getToken();
    //     if (token) {
    //       const isTokenExpired = this.authService.isTokenExpired(token);
    //       if (isTokenExpired) {
    //         localStorage.removeItem('token');
    //         localStorage.setItem('tokenValid', 'false');
    //       } else {
    //         localStorage.setItem('tokenValid', 'true');
    //         let req2 = req.clone({
    //           url: (!isDevMode ? apiEndPoint.href : ''),
    //           setHeaders: {
    //             Authorization: `Bearer ${token}`
    //           }
    //         });
    //         return next.handle(req2);
    //       }
    //     }
    //   }
    // }

    let apiEndPoint = new URL(req.url, BASE_URL);
    const isDevMode = window.location.host.includes('localhost');
    const token = this.authService.getToken();
    // handle if running on production
    if (isDevMode) {
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
