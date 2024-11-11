import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Profile} from './model/Profile';

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

  getProfile() {
    const token = localStorage.getItem('token');
    if (!token) return;
    this.http.get('/api/user/get-profile')
      .subscribe((res: any) => {
        if (res?.success) {
          this.isLogin = true;
          const p: Profile = {
            fullName: res.data.fullName,
            email: res.data.email,
            avatar: res.data.avatar,
            password: '',
            phone: res.data.phone,
            address: res.data.address,
            userId: res.data._id,
          };
          this.currentUser = p;
          this.paramUser = JSON.parse(JSON.stringify(p));
        } else {
          this.isLogin = false;
        }
      });
  }
}


