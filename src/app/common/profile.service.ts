import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  currentUser: any;
  constructor(private http: HttpClient) {
    this.getProfile();
  }

  getProfile(){
    this.http.get('/api/user/get-profile')
      .subscribe((res: any) => {
        if (res?.success) {
          const profile = {
            avatar: res?.data?.avatar,
            email: res?.data?.email,
            fullName: res?.data?.fullName,
            userId: res?.data?.userId,
          };
          this.currentUser = profile;
        }
      });
  }
}
