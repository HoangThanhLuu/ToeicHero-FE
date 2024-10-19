import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {GetHeaderService} from "../../../common/get-headers/get-header.service";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit{
  profileForm!: FormGroup;
  currentUser: any;

  constructor(private toast: ToastrService,
              private formBuilder: FormBuilder,
              private http: HttpClient,
              private getHeaderService: GetHeaderService) {
  }


  ngOnInit(): void {


    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    const headers = this.getHeaderService.getHeaderAuthentication();
    this.http.get('/api/user/get-profile', {
      headers
    })
      .subscribe((res: any) => {
        if (res?.success) {
          this.currentUser = res?.data;
        }
      })
  }

  onSubmit(): void {
    if (this.currentUser) {
      // Xử lý khi form được submit, gửi thông tin lên server hoặc xử lý theo nhu cầu của bạn
      console.log('Updating user:', this.currentUser);
      // Gọi API để cập nhật thông tin của currentUser
      this.http.post('/api/user/update-profile', this.currentUser).subscribe((res: any) => {
        if (res?.success) {
          this.toast.success('Profile updated successfully');
        } else {
          this.toast.error('Failed to update profile');
        }
      });
    }
  }
}
