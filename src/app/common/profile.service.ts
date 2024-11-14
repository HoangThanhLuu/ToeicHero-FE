import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Profile} from './model/Profile';
import {ResolveFn} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  currentUser: Profile = new Profile();
  paramUser: Profile = {
    fullName: '',
    email: '',
    avatar: '/assets/images/default-avatar.jpg',
    password: '',
    phone: '',
    address: '',
    userId: '',
  };
  isLogin: boolean = false;

  constructor(private http: HttpClient) {
    this.getProfileData();
  }

  get getAvatar() {
    return this.currentUser.avatar;
  }

  public userIsLogin() {
    return this.isLogin;
  }

  setProfile(profile = new Profile()): void {
    this.currentUser = profile;
  }
  getProfileData(): Observable<Profile> {
    return new Observable<any>((subscriber: any) => {
      const sub = this.http.get('/api/user/get-profile').subscribe({
        next: (res: any) => {
          if (res.success) {
            this.isLogin = true;
            this.setProfile(res.data as Profile);
            if (this.currentUser.avatar === null) {
              this.currentUser.avatar = '/assets/images/default-avatar.jpg';
            }
            if (this.currentUser.email === 'admin') {
              window.location.href = '/admin';
            }
          } else {
            this.isLogin = false;
            localStorage.removeItem('token');
            localStorage.removeItem('tokenValid');
            window.location.href = '/login';
          }
          subscriber.next(res.data);
        },
        error: (err) => {
          subscriber.error(err.error);
        },
        complete: () => subscriber.complete()
      });
      return () => sub.unsubscribe();
    });
  }
}


export const profileResolver: ResolveFn<Observable<Profile>> = () => {
  return inject(ProfileService).getProfileData();
};


