import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {BsModalRef} from "ngx-bootstrap/modal";
import {TranslateService} from "@ngx-translate/core";
import {finalize} from "rxjs";
import {AdminLibBaseCss3, AdminStyle2} from "../../admin.style";

@Component({
  selector: 'app-update-slider',
  templateUrl: './update-slider.component.html',
  styleUrls: ['./update-slider.component.scss',...AdminLibBaseCss3, ...AdminStyle2]
})
export class UpdateSliderComponent implements OnInit {

  @Input() title: string = "Cập nhật Slider: ";
  @Output() added = new EventEmitter();
  @Output() addSuccessEmit = new EventEmitter();
  @Input() isAdd = true;
  @Input() idSlider: number = 0;
  @Input() isShowImage: boolean = false;
  @Input() imageSrc: string | undefined = "";
  @Input() isPopup: boolean = false;
  formData = new FormData();
  showBorderError: boolean = false;

  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private spinnerService: NgxSpinnerService,
              private bsModalRef: BsModalRef,
              private translate: TranslateService,
  ) {
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

  handleFiles(file: any) {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.isShowImage = true;
        this.imageSrc = `${e.target?.result}`;
        // clear old file
        this.formData.delete('file');
        // add new file
        this.formData.append('file', file);
      };
      reader.readAsDataURL(file);
    }
  }
  closeImg(imageSrc: string | undefined) {
    if (imageSrc) {
      this.isShowImage = false;
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
    const url = this.isAdd ? '/api/slider/add' : encodeURI(`/api/slider/update/${this.idSlider}`);
    this.http.post<any>(url, this.formData)
      .pipe(
        finalize(() => {
          if(this.isPopup) {
            this.bsModalRef.hide();
          }
        })
      )
      .subscribe({
        next: (res: any) => {
          this.spinnerService.hide();
          if (res?.success) {
            const msg = this.translate.instant(`SLIDER.${res?.message}`);
            this.toastr.success(msg);
            this.added.emit();
            this.addSuccessEmit.emit();
            this.formData.delete('file');
          } else {
            const msg = this.translate.instant(`SLIDER.${res?.message}`);
            this.toastr.success(msg);
          }
        },
        error: (error) => {
          console.error('Lỗi:', error);
          this.toastr.error('Đã xảy ra lỗi');
          this.spinnerService.hide();
        }
      });
  }

}
