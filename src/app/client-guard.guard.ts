import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ClientGuardGuard implements CanActivate {

  constructor(private http: HttpClient) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.http.get('/api/user/is-login')
      .subscribe((res: any) => {
        if (res?.success) {
          if (!res?.data) {
            localStorage.removeItem('token');
            localStorage.removeItem('tokenValid');
            localStorage.removeItem('profile');
            window.location.href = '/login';
            return false;
          }
          return true;
        } else {
          return false;
        }
      });
    return true;
  }
}
