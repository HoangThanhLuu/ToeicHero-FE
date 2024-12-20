import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {BsModalRef} from "ngx-bootstrap/modal";
import {TranslateService} from "@ngx-translate/core";
import {ScrollService} from "../../../common/scroll.service";

@Component({
  selector: 'app-update-revai',
  templateUrl: './update-revai.component.html',
  styleUrls: ['./update-revai.component.scss']
})
export class UpdateRevaiComponent implements OnInit{
  @Input() title: string = "Add account REV-AI: ";
  @Input() isAdd = true;
  @Input() isPopup: boolean = false;
  @Output() added = new EventEmitter();
  @Output() addSuccessEmit = new EventEmitter();
  @Input() params: any = {
    email: '',
    password: ''
  };
  showBorderError: any = [];


  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private spinnerService: NgxSpinnerService,
              private bsModalRef: BsModalRef,
              private translate: TranslateService,
              private scrollService: ScrollService) {
  }

  ngOnInit(): void {
    this.scrollService.scrollToTop();
    }
  addAccount(): void {
    if(!this.params.email) {
      this.toastr.error('Please input Email');
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
    this.http.post('/api/revai/account/update', this.params)
      .subscribe({
        next: (res: any) =>{
          const msg = this.translate.instant(`REVAI.${res?.message}`);
          this.toastr.success(msg);
          this.added.emit('updateOk');
          this.addSuccessEmit.emit();
          this.spinnerService.hide();
          this.params = {
            email: '',
            password: ''
          }
          if(this.isPopup) {
            this.close();
          }
        },
        error: (res: any) => {
          const msg = this.translate.instant(`REVAI.${res?.message}`);
          this.toastr.error(msg);
          this.spinnerService.hide();
        }
      })
  }
  close() {
    this.bsModalRef.hide();
  }
}
