import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {GetHeaderService} from "../../../common/get-headers/get-header.service";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {AuthService} from "../../../auth.service";
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  profileForm!: FormGroup;
  currentUser: any;
  currentProfile: any;

  constructor(private toast: ToastrService,
              private formBuilder: FormBuilder,
              private http: HttpClient,
              private bsModalRef: BsModalRef,
              private auth: AuthService,
              private getHeaderService: GetHeaderService) {
    this.profileForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const token = this.auth.getToken();
    const isLogin = token ? !this.auth.isTokenExpired(token) : false;

    if (isLogin) {
      const profile = localStorage.getItem('profile');
      if (profile) {
        this.currentProfile = JSON.parse(profile);
        this.currentUser = JSON.parse(profile);
      } else {
        const headers = this.getHeaderService.getHeaderAuthentication();
        this.http.get('/api/user/get-profile', {
          headers
        })
          .subscribe((res: any) => {
            if (res?.success) {
              this.currentUser = res?.data;
              const profile = {
                email: res?.data?.email,
                fullName: res?.data?.fullName,
                address: res?.data.address,
                phone: res?.data.phone
              };
              localStorage.setItem('profile', JSON.stringify(profile));
              this.currentProfile = profile;
            } else {
              localStorage.removeItem('profile');
              localStorage.removeItem('token');
              window.location.reload();
            }
          });
      }
    }
  }

  onSubmit(): void {
    if (this.profileForm) {
      const updatedProfile = this.profileForm.value;
      this.http.patch('/api/user/update-profile', updatedProfile)
        .subscribe((res: any) => {
          if (res?.success) {
            this.toast.success('Chỉnh sửa thông tin thành công');
            this.currentProfile.fullName = updatedProfile.fullName;
            this.currentProfile.address = updatedProfile.address;
            this.currentProfile.phone = updatedProfile.phone;
            localStorage.setItem('profile', JSON.stringify(this.currentProfile));
            window.location.reload();
          } else {
            this.toast.error('Chỉnh sửa thông tin thất bại');
          }
        });
    } else {
      this.toast.error('Chỉnh sửa thông tin thất bại');
    }
  }

  closeModal() {
    this.bsModalRef.hide();
  }
}
