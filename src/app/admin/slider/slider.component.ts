import {
  Component,
  OnInit
} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {
  AdminLibBaseCss2,
  AdminStyle
} from '../admin.style';
import {finalize} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {UpdateSliderComponent} from './update-slider/update-slider.component';
import {
  NzModalRef,
  NzModalService
} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss', ...AdminStyle, ...AdminLibBaseCss2]
})
export class SliderComponent implements OnInit {
  title: string = "Manage slider";
  currentPage: string = "Slider";
  page = 1;
  size = 10;
  totalElement = 0;
  listSlider: any = [];


  constructor(
    private bsModalService: BsModalService,
    private spin: NgxSpinnerService,
    private toast: ToastrService,
    private modal: NzModalService,
    private http: HttpClient,
    private translate: TranslateService,) {
  }


  ngOnInit(): void {
    this.getListSlider(`api/slider/all?page=${this.page}&size=${this.size}`);
  }

  getListSlider(url: string) {
    this.http.get(url)
      .subscribe((res: any) => {
        this.listSlider = res.content;
        this.totalElement = res.totalElements;
      });
  }

  trackByFn(index: number, data: any): any {
    return data.id;
  }

  deleteSlider(sliderId: number): void {
    const confirmModal: NzModalRef = this.modal.create({
      nzTitle: `Confirm`,
      nzContent: `Do you want to delete?`,
      nzCentered: true,
      nzFooter: [
        {
          label: 'Cancel',
          onClick: () => confirmModal.destroy()
        }, {
          label: 'Agree',
          type: 'primary',
          onClick: () => {
            this.spin.show().then();
            this.http.delete<any>(`/api/slider/delete/${sliderId}`)
              .pipe(
                finalize(() => {
                  this.getListSlider(`api/slider/all?page=${this.page}&size=${this.size}`);
                })
              )
              .subscribe({
                next: (res: any) => {
                  const msg = this.translate.instant(`SLIDER.${res?.message}`);
                  this.toast.success(msg);
                  this.spin.hide().then();
                  confirmModal.destroy();
                },
                error: (res: any) => {
                  const msg = this.translate.instant(`SLIDER.${res?.message}`);
                  this.toast.success(msg);
                  this.spin.hide().then();
                }
              });
          }
        }
      ]
    });
  }

  actionPosition(sliderId: number, position: number, action: string): void {
    this.http.patch(`api/slider/update/${sliderId}/${position}/${action}`, {})
      .pipe(
        finalize(() => {
          this.getListSlider(`api/slider/all?page=${this.page}&size=${this.size}`);
        })
      )
      .subscribe({
        next: (res: any) => {
          const msg = this.translate.instant(`SLIDER.${res?.message}`);
          this.toast.success(msg);
        },
        error: (res) => {
          const msg = this.translate.instant(`SLIDER.${res?.message}`);
          this.toast.success(msg);
          this.spin.hide().then();
        }
      });
  }

  update(data: any) {
    const bsRef = this.bsModalService.show(UpdateSliderComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Update Account Rev-ai ',
        isAdd: false,
        idSlider: data.id,
        imageSrc: data.image,
        isShowImage: true,
        isPopup: true
      }
    });
    if (bsRef?.content) {
      bsRef.content.added.subscribe(() => {
        this.getListSlider(`api/slider/all?page=${this.page}&size=${this.size}`);
      });
    }
  }
  openFormAdd() {
    const bsModalRef = this.bsModalService.show(UpdateSliderComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Add Slider'
      }
    });
    if (bsModalRef && bsModalRef.content) {
      bsModalRef.content.addSuccessEmit.subscribe(() => {
        this.getListSlider(`api/slider/all?page=${this.page}&size=${this.size}`);
      });
    }
  }
  sizeChange(e: any): void {
    this.getListSlider(`api/slider/all?page=${this.page}&size=${e}`);
  }


  pageIndexChange(e: any) {
    this.getListSlider(`api/slider/all?page=${e}&size=${this.size}`);
  }
}
