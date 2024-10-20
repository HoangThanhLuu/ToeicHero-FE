import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {BsModalRef} from "ngx-bootstrap/modal";
import {AdminLibBaseCss3, AdminStyle2} from "../../admin.style";

@Component({
  selector: 'app-update-slider',
  templateUrl: './update-slider.component.html',
  styleUrls: ['./update-slider.component.scss', ...AdminLibBaseCss3, ...AdminStyle2,]
})
export class UpdateSliderComponent implements OnInit {

  @Input() title: string = "Cập nhật Slider: ";
  @Output() added = new EventEmitter();
  isShowImage: boolean = false;
  imageSrc: string | undefined = "";
  formData = new FormData();
  showBorderError: boolean = false;

  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private spinnerService: NgxSpinnerService,
              private bsModalRef: BsModalRef) {
  }

  ngOnInit() {
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    this.handleFiles(file);
  }

  close() {
    this.bsModalRef.hide();
  }

  handleFiles(file: any){
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.isShowImage = true;
        this.imageSrc = `${e.target?.result}`;
        this.formData.append('file', file);
      };
      reader.readAsDataURL(file);
    }
  }

  allowDrop(event: any) {
    event.preventDefault();
  }

  handleDrop(event: any) {
    event.preventDefault();
    const files = event.dataTransfer.files[0];
    this.handleFiles(files);
  }

  addNew(): void {
    if (!this.formData.has('file')) {
      this.toastr.error('Vui lòng chọn ảnh');
      return;
    }
    this.spinnerService.show();
    this.http.post<any>('/api/slider/add', this.formData)
      .subscribe({
        next: (res: any) => {
          if (res?.success) {
            this.toastr.success('Thành công');
            this.added.emit();
            this.bsModalRef.hide();
          } else {
            this.toastr.error('Không thành công');
          }
          this.spinnerService.hide();
        },
        error: (error) => {
          console.error('Lỗi:', error);
          this.toastr.error('Đã xảy ra lỗi');
          this.spinnerService.hide();
        }
      });
  }
}
