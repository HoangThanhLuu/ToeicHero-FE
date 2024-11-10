import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  currentUser: any;
  paramUser: any = {
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
    this.http.get('/api/user/get-profile')
      .subscribe((res: any) => {
        if (res?.success) {
          this.isLogin = true;
          const profile = {
            avatar: res?.data?.avatar,
            email: res?.data?.email,
            fullName: res?.data?.fullName,
            userId: res?.data?.userId,
          };
          this.currentUser = profile;
          this.paramUser = {
            ...this.paramUser,
            ...profile,
          };
        } else {
          this.isLogin = false;
        }
      });
  }
}
