import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {BsModalRef} from "ngx-bootstrap/modal";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-update-tiny',
  templateUrl: './update-tiny.component.html',
  styleUrls: ['./update-tiny.component.scss']
})
export class UpdateTinyComponent {
  @Input() title: string = "Add Tiny: ";
  @Input() isAdd = true;
  @Input() isPopup: boolean = false;
  @Output() added = new EventEmitter();
  @Output() addSuccessEmit = new EventEmitter();
  @Input() params: any = {
    username: '',
    password: ''
  };
  showBorderError: any = [];

  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private spinnerService: NgxSpinnerService,
              private bsModalRef: BsModalRef,
              private  translate: TranslateService) {
  }
  addAccount(): void {
    if(!this.params.username) {
      this.toastr.error('Please input Username');
      this.showBorderError[0] = true;
      return;
    }else{
      this.showBorderError[0] = false;
    }
    if(!this.params.password) {
      this.toastr.error('Please input Password');
      this.showBorderError[1] = true;
      return;
    }else{
      this.showBorderError[1] = false;
    }
    this.spinnerService.show();
    this.http.post('/api/tiny-account/update', this.params)
      .subscribe({
        next: (res: any) =>{
          const msg = this.translate.instant(`TINY.${res?.message}`);
          this.toastr.success(msg);
          this.added.emit('updateOk');
          this.addSuccessEmit.emit();
          this.spinnerService.hide();
          this.params = {
            username: '',
            password: ''
          }
          if(this.isPopup) {
            this.close();
          }
        },
        error: (res: any) => {
          const msg = this.translate.instant(`TINY.${res?.message}`);
          this.toastr.error(msg);
          this.spinnerService.hide();
        }
      })
  }
  close() {
    this.bsModalRef.hide();
  }
}
