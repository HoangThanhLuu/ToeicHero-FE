import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {BsModalRef} from "ngx-bootstrap/modal";
import {NgxSpinnerService} from "ngx-spinner";
import {ProfileService} from '../../../common/profile.service';
import {Profile} from '../../../common/model/Profile';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  currentProfile: Profile = new Profile();
  formData = new FormData();
  @Output() close = new EventEmitter();
  @Input() isPopup: boolean = false;

  constructor(private http: HttpClient,
              private bsModalRef: BsModalRef,
              private spin: NgxSpinnerService,
              protected profileService: ProfileService) {
  }

  ngOnInit(): void {
    this.currentProfile = JSON.parse(JSON.stringify(this.profileService.currentUser));
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
        this.currentProfile.avatar = `${e.target?.result}`;
        this.formData.append('file', file);
      };
      reader.readAsDataURL(file);
    } else {
      this.currentProfile.avatar = this.profileService?.currentUser?.avatar;
      this.formData.delete('file');
    }
  }

  onUpdateProfile() {
    this.spin.show().then(r => r);
    this.formData.append('fullName', this.currentProfile.fullName);
    this.formData.append('address', this.currentProfile.address);
    this.formData.append('phone', this.currentProfile.phone);
    this.http.patch('/api/user/update-profile', this.formData)
      .subscribe(_ => {
        this.spin.hide().then(r => r);
        this.close.emit('ok');
        this.bsModalRef.hide();
      });
  }
}
