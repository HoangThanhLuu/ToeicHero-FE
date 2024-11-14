import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {NgxSpinnerService} from 'ngx-spinner';
import {catchError, finalize, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {ProfileService} from '../../../common/profile.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent {
  profileForm!: FormGroup;
  avatarSrc: string = '';
  formData = new FormData();
  @Output() close = new EventEmitter();

  constructor(private toast: ToastrService,
              private formBuilder: FormBuilder,
              private http: HttpClient,
              private bsModalRef: BsModalRef,
              private spin: NgxSpinnerService,
              protected profileService: ProfileService) {
    this.profileForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required]
    });
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
        this.formData.delete('file');
        this.formData.append('file', file);
      };
      reader.readAsDataURL(file);
    } else {
      this.avatarSrc = this.profileService.currentUser?.avatar;
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
              this.toast.success('Edited information successfully');
            } else {
              this.toast.error(res?.message);
            }
          }),
          catchError(error => {
            this.toast.error('Editing information failed');
            return of(null);
          }),
          finalize(() => this.spin.hide().then(r => r))
        ).subscribe();
    } else {
      this.toast.error('Editing information failed');
    }
  }
}
