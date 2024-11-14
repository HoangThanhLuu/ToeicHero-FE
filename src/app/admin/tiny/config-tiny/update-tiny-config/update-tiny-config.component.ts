import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {TranslateService} from '@ngx-translate/core';
import {ScrollService} from "../../../../common/scroll.service";

@Component({
  selector: 'app-update-tiny-config',
  templateUrl: './update-tiny-config.component.html',
  styleUrls: ['./update-tiny-config.component.scss']
})
export class UpdateTinyConfigComponent implements OnInit{
  @Input() title: string = 'Add account Config Tiny : ';
  @Input() isAdd = true;
  @Input() isPopup: boolean = false;
  @Output() added = new EventEmitter();
  @Output() addSuccessEmit = new EventEmitter();
  @Input() params = {
    tinyConfigId: '',
    apiKey: ''
  };
  showBorderError: any = [];

  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private spinnerService: NgxSpinnerService,
              private bsModalRef: BsModalRef,
              private  translate: TranslateService,
              private scrollService: ScrollService) {
  }

  ngOnInit(): void {
    this.scrollService.scrollToTop();
    }
  addAccount(): void {
    if(!this.params.apiKey) {
      this.toastr.error('Please input Access API Key');
      this.showBorderError[0] = true;
      return;
    }else{
      this.showBorderError[0] = false;
    }
    const urlUpdate = `/api/tiny-config/update/${this.params.tinyConfigId}?apiKey=${this.params.apiKey}`;
    const urlAdd = `/api/tiny-config/add?apiKey=${this.params.apiKey}`;
    const url = this.isAdd ? urlAdd : urlUpdate;
    this.spinnerService.show();
    this.http.post(url, {})
        .subscribe({
          next: (res: any) =>{
            if(res.success){
              const msg = this.translate.instant(`TINY.${res?.message}`);
              this.toastr.success(msg);
            }else {
              const msg = this.translate.instant(`TINY.DUPLUCATE_KEY`);
              this.toastr.error(msg);
            }
            this.added.emit('Ok');
            this.addSuccessEmit.emit();
            this.spinnerService.hide();
            this.params = {
              tinyConfigId: '',
              apiKey: ''
            }
            if(this.isPopup) {
              this.close();
            }
          },
          error: (res: any) => {
            const msg = this.translate.instant(`TINY.DUPLUCATE_KEY`);
            this.toastr.error(msg);
            this.spinnerService.hide();
          }
        })
  }
  close() {
    this.bsModalRef.hide();
  }
}
