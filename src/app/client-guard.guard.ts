import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
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
