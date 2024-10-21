import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {BsModalRef} from "ngx-bootstrap/modal";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-update-kommunicate',
  templateUrl: './update-kommunicate.component.html',
  styleUrls: ['./update-kommunicate.component.scss']
})
export class UpdateKommunicateComponent implements OnInit {
  @Input() title: string = "Thêm tài khoản Kommunicate: ";
  @Input() isAdd = true;
  @Input() param: any = {
    email: '',
    password: ''
  };
  @Output() added = new EventEmitter();
  @Output() addSuccessEmit = new EventEmitter();
  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private spinnerService: NgxSpinnerService,
              private bsModalRef: BsModalRef,
              private  translate: TranslateService) {
  }
  ngOnInit(): void {
  }

  addAccount(): void {
    this.spinnerService.show();
    this.http.post('/api/kommunicate/account/update', this.param)
      .subscribe({
        next: (res: any) =>{
          const msg = this.translate.instant(`KOMMUNICATE.${res?.message}`);
          this.toastr.success(msg);
          this.added.emit('updateOk');
          this.addSuccessEmit.emit();
          this.spinnerService.hide();
          this.close();
        },
        error: (res: any) => {
          const msg = this.translate.instant(`KOMMUNICATE.${res?.message}`);
          this.toastr.error(msg);
          this.spinnerService.hide();
        }
      })
  }
  close() {
    this.bsModalRef.hide();
  }
}
