import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {GetHeaderService} from "../../../common/get-headers/get-header.service";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {AuthService} from "../../../auth.service";

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit{
  profileForm!: FormGroup;
  currentUser: any;
  profile: any;

  constructor(private toast: ToastrService,
              private formBuilder: FormBuilder,
              private http: HttpClient,
              private auth: AuthService,
              private getHeaderService: GetHeaderService) {
  }

  ngOnInit(): void {


    this.profileForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required]

    });

    const token = this.auth.getToken();
    const isLogin = token ? !this.auth.isTokenExpired(token) : false;

    if (isLogin) {
      const profile = localStorage.getItem('profile');
      if (profile) {
        this.profile = JSON.parse(profile);

      } else {
        const headers = this.getHeaderService.getHeaderAuthentication();
        this.http.get('/api/user/get-profile', {
          headers
        })
          .subscribe((res: any) => {
            if (res?.success) {
              const profile = {
                email: res?.data?.email,
                fullName: res?.data?.fullName,
                address: res?.data.address,
                phone: res?.data.phone
              };
              localStorage.setItem('profile', JSON.stringify(profile));
              this.profile = profile;

            }
          });
      }
    }
    // const headers = this.getHeaderService.getHeaderAuthentication();
    // this.http.get('/api/user/get-profile', {
    //   headers
    // })
    //   .subscribe((res: any) => {
    //     if (res?.success) {
    //       this.currentUser = res?.data;
    //     }
    //   })
  }

  onSubmit(): void {
    if (this.profileForm) {
      console.log('Updating user:', this.profileForm.value);
      const updatedProfile = this.profileForm.value;
      this.http.patch('/api/user/update-profile', updatedProfile).subscribe((res: any) => {
        if (res?.success) {
          this.toast.success('Chỉnh sửa thông tin thành công');

          localStorage.setItem('updatedProfile', JSON.stringify(updatedProfile));
          window.location.reload();
        } else {
          this.toast.error('Chỉnh sửa thông tin thất bại');
        }
      });
    }
  }
}
