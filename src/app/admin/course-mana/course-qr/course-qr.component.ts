import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AdminLibBaseCss3, AdminStyle2} from '../../admin.style';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-course-qr',
  templateUrl: './course-qr.component.html',
  styleUrls: ['./course-qr.component.scss', ...AdminLibBaseCss3, ...AdminStyle2]
})
export class CourseQrComponent implements OnInit {
  title: string = 'Management QR Code payment';
  currentPage: string = 'QR Code payment';
  isShowImage: boolean = false;
  imageSrc: string | undefined = '';
  formData = new FormData();

  constructor(private http: HttpClient, private toast: ToastrService, private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.http.get('/api/course/qr-code')
      .subscribe({
        next: (res: any) => {
          if (res?.success && res?.data) {
            this.imageSrc = res.data;
            this.isShowImage = true;
          }
        },
        error: () => {
          this.isShowImage = false;
        }
      });
  }

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    this.handleFiles(file);
  }

  handleFiles(file: any): void {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.isShowImage = true;
        this.imageSrc = `${e.target?.result}`;
        // clear old file
        this.formData.delete('file');
        // add new file
        this.formData.append('qr', file);
      };
      reader.readAsDataURL(file);
    }
  }

  deleteImg() {
    this.formData.delete('file');
    this.isShowImage = false;
    this.imageSrc = '';
  }

  allowDrop(event: any) {
    event.preventDefault();
  }

  handleDrop(event: any) {
    event.preventDefault();
    const files = event.dataTransfer.files[0];
    this.handleFiles(files);
  }

  doAction() {
    if (this.formData.get('qr') === null) {
      this.toast.error('Please select an image');
      return;
    }
    this.spinner.show().then();
    this.http.patch('/api/course/update-qr', this.formData)
      .subscribe({
        next: (res: any) => {
          this.spinner.hide().then();
          if (res.success) {
            this.ngOnInit();
            this.toast.success('Update QR code successfully');
          }
        },
        error: () => {
          this.spinner.hide().then();
          this.toast.error('Failed to update QR code');
          this.isShowImage = false;
        }
      });
  }
}
