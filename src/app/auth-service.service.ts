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

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    if (token) {
      const isTokenExpired = this.authService.isTokenExpired(token);
      if (isTokenExpired) {
        localStorage.removeItem('token');
        localStorage.setItem('tokenValid', 'false');
      } else {
        localStorage.setItem('tokenValid', 'true');
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    }
    // handle if running on production
    let apiEndPoint = new URL(req.url, BASE_URL);
    const apiReq = req.clone({url: apiEndPoint.href});
    const isDevMode = window.location.host.includes('localhost');
    return next.handle(isDevMode ? req : apiReq);
  }
}
