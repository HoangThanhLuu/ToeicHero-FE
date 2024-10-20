import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import {AdminLibBaseCss2, AdminStyle} from "../admin.style";
import {finalize} from "rxjs";
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss', ...AdminStyle, ...AdminLibBaseCss2]
})
export class SliderComponent implements OnInit {
  title: string = "Quản lý slider";
  currentPage: string = "Slider";
  page = 1;
  size = 10;
  totalElement = 0;
  listSlider: any = [];

  private sliderIdToDelete: number | undefined;
  isVisible = false;


  constructor(
    private modalService: NzModalService,
    private spin: NgxSpinnerService,
    private toast: ToastrService,
    private http: HttpClient,
   ) {
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
  handleOk(): void {
    if (this.sliderIdToDelete) {
      this.deleteSlider(this.sliderIdToDelete);
    }
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  showConfirm(sliderId: number): void {
    this.sliderIdToDelete = sliderId;
    this.isVisible = true;
  }


  deleteSlider(sliderId: number): void {
    this.spin.show().then();
    this.http.delete(`api/slider/delete/${sliderId}`)
      .pipe(
        finalize(() => {
          this.getListSlider(`api/slider/all?page=${this.page}&size=${this.size}`);
        })
      )
      .subscribe({
        next: () => {
          this.toast.success('Thanh cong');
          this.spin.hide().then();
        },
        error: () => {
          this.toast.success('Thanh cong');
          this.spin.hide().then();
        }
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
          this.toast.success('Thanh cong');
        },
        error: (res) => {
          this.toast.error(JSON.stringify(res));
          console.log(res);
          this.spin.hide().then();
        }
      });
  }

  sizeChange(e: any): void {
    this.getListSlider(`api/slider/all?page=${this.page}&size=${e}`);
  }


  pageIndexChange(e: any) {
    this.getListSlider(`api/slider/all?page=${e}&size=${this.size}`);
  }
}
