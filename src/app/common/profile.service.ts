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
    this.getProfile();
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

  getProfile() {
    const token = localStorage.getItem('token');
    if (!token) return;
    this.http.get('/api/user/get-profile')
      .subscribe((res: any) => {
        if (res?.success) {
          this.isLogin = true;
          const p: Profile = {
            fullName: res.data.full_name,
            email: res.data.email,
            avatar: res.data.avatar,
            password: '',
            phone: res.data.phone,
            address: res.data.address,
            userId: res.data.user_id,
          };
          this.currentUser = p;
          this.paramUser = JSON.parse(JSON.stringify(p));
        } else {
          this.isLogin = false;
          localStorage.removeItem('token');
          localStorage.removeItem('tokenValid');
        }
      });
  }

  getProfileData(): Observable<Profile> {
    return new Observable<any>((subscriber: any) => {
      const sub = this.http.get('/api/user/get-profile').subscribe({
        next: (res: any) => {
          if (res.success) {
            this.isLogin = true;
            this.setProfile(res.data as Profile);
          } else {
            this.isLogin = false;
            localStorage.removeItem('token');
            localStorage.removeItem('tokenValid');
            window.location.href = '/login';
          }
          subscriber.next(res);
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


