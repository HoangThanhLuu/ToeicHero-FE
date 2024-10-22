import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {BsModalRef} from "ngx-bootstrap/modal";
import {NgxSpinnerService} from "ngx-spinner";
import {AuthService} from "../../../auth.service";
import {GetHeaderService} from "../../../common/get-headers/get-header.service";
import {catchError, finalize, tap} from "rxjs/operators";
import {of} from "rxjs";

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit{
  profileForm!: FormGroup;
  currentUser: any;
  currentProfile: any;
  avatarSrc: string = '';
  formData = new FormData();
  @Output() close = new EventEmitter();

  constructor(private toast: ToastrService,
              private formBuilder: FormBuilder,
              private http: HttpClient,
              private bsModalRef: BsModalRef,
              private spin: NgxSpinnerService,
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
        this.avatarSrc = this.currentUser?.avatar;
      } else {
        const headers = this.getHeaderService.getHeaderAuthentication();
        this.http.get('/api/user/get-profile', {
          headers
        })
          .subscribe((res: any) => {
            if (res?.success) {
              this.currentUser = res?.data;
              this.avatarSrc = this.currentUser?.avatar;
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
              window.location.href = '/home';
            }
          });
      }
    }
  }
  closeModal() {
    this.close.emit('ok');
    this.bsModalRef.hide();
  }

  handleFileInput($event: any) {
    const file = $event.target.files[0];
    this.handleFiles(file);
  }

  handleFiles(file: any) {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.avatarSrc = `${e.target?.result}`;
        this.formData.append('file', file);
      };
      reader.readAsDataURL(file);
    } else {
      this.avatarSrc = this.currentUser?.avatar;
      this.formData.delete('file');
    }
  }

  onUpdateProfile() {
    if (this.profileForm) {
      const updatedProfile = this.profileForm.value;
      this.spin.show().then(r => r);
      this.formData.append('fullName', updatedProfile.fullName);
      this.formData.append('address', updatedProfile.address);
      this.formData.append('phone', updatedProfile.phone);
      this.http.patch('/api/user/update-profile', this.formData)
        .pipe(
          tap((res: any) => {
            if (res?.success) {
              this.toast.success('Chỉnh sửa thông tin thành công');
              this.currentProfile.fullName = updatedProfile.fullName;
              this.currentProfile.address = updatedProfile.address;
              this.currentProfile.phone = updatedProfile.phone;
              this.currentProfile.avatar = res?.data?.avatar;
              localStorage.setItem('profile', JSON.stringify(this.currentProfile));
            } else {
              this.toast.error(res?.message);
            }
          }),
          catchError(error => {
            this.toast.error('Chỉnh sửa thông tin thất bại');
            return of(null);
          }),
          finalize(() => this.spin.hide().then(r => r))
        ).subscribe();
    } else {
      this.toast.error('Chỉnh sửa thông tin thất bại');
    }
  }
}
