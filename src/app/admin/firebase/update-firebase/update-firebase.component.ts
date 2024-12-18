import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {BsModalRef} from "ngx-bootstrap/modal";
import {TranslateService} from "@ngx-translate/core";
import {ScrollService} from "../../../common/scroll.service";

@Component({
  selector: 'app-update-firebase',
  templateUrl: './update-firebase.component.html',
  styleUrls: ['./update-firebase.component.scss']
})
export class UpdateFirebaseComponent implements OnInit{
  @Input() title: string = "Add Firebase: ";
  @Input() isAdd = true;
  @Input() ismodify = false;
  @Input() isPopup: boolean = false;
  @Output() modified = new EventEmitter();
  @Output() addSuccessEmit = new EventEmitter();
  isShowFile: boolean = false;
  showBorderError: boolean = false;
  formData = new FormData();
  fileUrl: string | null = null;
  @Input() params: any = {
    id: '',
    tokenKey: ''
  };
  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private spinnerService: NgxSpinnerService,
              private bsModalRef: BsModalRef,
              private scrollService: ScrollService,
              private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.scrollService.scrollToTop();
    }

  addFirebase(): void {
    if (!this.params.tokenKey) {
      this.toastr.error('Please input Key');
      this.showBorderError = true;
      return;
    } else {
      this.showBorderError = false;
    }
    if (!this.formData.has('file')) {
      this.toastr.error('Please select file');
      return;
    }
    this.spinnerService.show();
    this.formData.append('tokenKey', this.params.tokenKey);
    this.http.post('/api/firebase/config/add', this.formData)
      .subscribe({
        next: (res: any) => {
          const msg = this.translate.instant(`FIREBASE.${res?.message}`);
          this.toastr.success(msg);
          this.addSuccessEmit.emit();
          this.spinnerService.hide();
          if (this.isPopup) {
            this.close();
          }
        },
        error: (res: any) => {
          const msg = this.translate.instant(`FIREBASE.${res?.message}`);
          this.spinnerService.hide().then();
          this.toastr.error(msg);
        }
      })
    this.formData.delete('tokenKey');
    this.formData.delete('file');
  }

  modifyFirebase() {
    this.formData.append('tokenKey', this.params.tokenKey);
    this.spinnerService.show().then();
    this.http.patch(`/api/firebase/config/update/${this.params.id}`, this.formData)
      .subscribe({
        next: (res: any) => {
          const msg = this.translate.instant(`FIREBASE.${res?.message}`);
          this.toastr.success(msg);
          this.modified.emit();
          this.spinnerService.hide();
          if (this.isPopup) {
            this.close();
          }
        },
        error: (res: any) => {
          const msg = this.translate.instant(`FIREBASE.${res?.message}`);
          this.spinnerService.hide().then();
          this.toastr.error(msg);
        }
      })
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
        this.isShowFile = true;
        this.fileUrl = `${e.target?.result}`;
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
}
