import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {BsModalRef} from "ngx-bootstrap/modal";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-update-config',
  templateUrl: './update-config.component.html',
  styleUrls: ['./update-config.component.scss']
})
export class UpdateConfigComponent {
  @Input() title: string = "Cập nhật Config: ";
  @Input() isAdd = true;
  formData = new FormData();
  @Input() params: any = {
    id: '',
    accessToken: ''
  };
  @Output() added = new EventEmitter();
  @Output() addSuccessEmit = new EventEmitter();
  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private spinnerService: NgxSpinnerService,
              private bsModalRef: BsModalRef,
              private  translate: TranslateService) {
  }

  addAccount(): void {
    this.formData.append('accessToken', this.params.accessToken);
    this.spinnerService.show();
    this.http.post('/api/revai/config/add', this.formData)
      .subscribe({
        next: (res: any) =>{
          const msg = this.translate.instant(`REVAI.${res?.message}`);
          this.toastr.success(msg);
          this.spinnerService.hide();
          this.close();
        },
        error: (res: any) => {
          const msg = this.translate.instant(`REVAI.${res?.message}`);
          this.toastr.error(msg);
          this.spinnerService.hide();
        }
      })
    this.formData.delete('accessToken');
  }
  modify(): void {
    this.formData.append('accessToken', this.params.accessToken);
    this.spinnerService.show();
    this.http.patch(`/api/revai/config/update/${this.params.id}`, this.formData)
      .subscribe({
        next: (res: any) =>{
          const msg = this.translate.instant(`REVAI.${res?.message}`);
          this.toastr.success(msg);
          this.added.emit('updateOk');
          this.addSuccessEmit.emit();
          this.spinnerService.hide();
          this.close();
        },
        error: (res: any) => {
          const msg = this.translate.instant(`REVAI.${res?.message}`);
          this.toastr.error(msg);
          this.spinnerService.hide();
          this.formData.delete('accessToken');
        }
      });

  }
  close() {
    this.bsModalRef.hide();
  }
}