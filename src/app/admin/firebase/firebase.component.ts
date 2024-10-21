import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {HttpClient} from "@angular/common/http";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {finalize} from "rxjs";
import {UpdateEmailComponent} from "../email/update-email/update-email.component";
import {UpdateFirebaseComponent} from "./update-firebase/update-firebase.component";

interface TableItem {
  projectId: number;
  tokenKey: string;
  bucketName: string;
  fileJson: string;
  switchValue: boolean;
}

@Component({
  selector: 'app-firebase',
  templateUrl: './firebase.component.html',
  styleUrls: ['./firebase.component.scss']
})
export class FirebaseComponent implements OnInit{
  title: string = "Quản lý tính Firebase";
  currentPage: string = "Firebase";
  listFirebase: any = [];
  private idFirebaseToDelete: number | undefined;
  isVisible: boolean =false;
  showFullData: boolean = false;

  constructor(
    private bsModalService: BsModalService,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private  translate: TranslateService,
    private bsModalRef: BsModalRef
  ) {
  }
  ngOnInit(): void {
    this.getListFirebase();
  }
  getListFirebase() {
    this.http.get('/api/firebase/config/all')
      .subscribe((res: any) => {
        this.listFirebase = res;
      });
  }
  onSwitchChange(id: number) {
    this.spinner.show();
    this.http.patch(`api/firebase/config/update/status/${id}`, {})
      .pipe(
        finalize(() => {
          this.getListFirebase()
        })
      )
      .subscribe( {
        next: (res: any)  => {
          const mgs = this.translate.instant(`FIREBASE.${res?.message}`);
          this.toastr.success(mgs);
          this.spinner.hide().then();
        },
        error: (res: any) => {
          const mgs = this.translate.instant(`FIREBASE.${res?.message}`);
          this.toastr.success(mgs);
          this.spinner.hide().then();
        }
      })
  }
  handleOk(): void {
    if (this.idFirebaseToDelete) {
      this.deleteFirebase(this.idFirebaseToDelete);
    }
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  showConfirm(id: number): void {
    this.idFirebaseToDelete = id;
    this.isVisible = true;
  }
  deleteFirebase(id: number) :void {
    this.spinner.show().then()
    this.http.delete(`/api/firebase/config/remove/${id}`)
      .pipe(
        finalize(() => {
          this.getListFirebase();
        })
      )
      .subscribe({
        next: (res: any) => {
          const msg = this.translate.instant(`FIREBASE.${res?.message}`);
          this.toastr.success(msg);
          this.spinner.hide().then();
        },
        error: (res: any) => {
          const msg = this.translate.instant(`FIREBASE.${res?.message}`);
          this.toastr.error(msg);
          this.spinner.hide().then();
        }
      });
  }
  openFormAdd() {
    const bsModalRef = this.bsModalService.show(UpdateFirebaseComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Thêm Firebase'
      }
    });
    if (bsModalRef && bsModalRef.content) {
      bsModalRef.content.addSuccessEmit.subscribe(() => {
        this.getListFirebase();
      });
    }
  }
}
