import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AdminLibBaseCss3, AdminStyle2} from "../../admin.style";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {forkJoin, from, of, tap} from 'rxjs';
import {concatMap, toArray} from 'rxjs/operators';
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css',
    ...AdminLibBaseCss3,
    ...AdminStyle2,
  ]
})
export class AddExamComponent implements OnInit {
  @Input() title: string = "Add Exam";
  @Output() addSuccessEmit = new EventEmitter();
  listTopic: any = [];
  audioParts = Array.from({length: 4});
  selectedFiles: any = [];
  showBorderError: boolean = false;
  param: any = {
    examName: '',
    topicId: '',
    audioPart1: '',
    audioPart2: '',
    audioPart3: '',
    audioPart4: '',
  }

  constructor(private http: HttpClient, private toastr: ToastrService, private spinnerService: NgxSpinnerService, private bsModalRef: BsModalRef) {
  }

  ngOnInit(): void {
    this.getListTopic();
  }

  private getListTopic() {
    this.http.get('/api/admin/topic/list')
      .subscribe((res: any) => {
        if (res?.success) {
          this.listTopic = res?.data;
        }
      })
  }

  uploadFile(file: File, index: number) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post('/api/upload-file', formData)
      .pipe(
        concatMap((response: any) => {
          return from([response?.data]);
        })
      );
  }

  addNewExam() {
    if (!this.param.examName) {
      this.toastr.error('', 'Tên đề thi không được để trống', {
        titleClass: 'fs-message',
      });
      this.showBorderError = true
      return;
    }

    this.spinnerService.show();
    let tempParam = { ...this.param };
    const uploadObservables = this.selectedFiles.map((file: any, index: any) => {
      if (file !== null && file !== undefined) {
        return this.uploadFile(file, index).pipe(
          tap((url: string) => {
            switch (index) {
              case 0: this.param.audioPart1 = url; break;
              case 1: this.param.audioPart2 = url; break;
              case 2: this.param.audioPart3 = url; break;
              case 3: this.param.audioPart4 = url; break;
            }
          })
        );
      } else {
        return of('');
      }
    });
    forkJoin<string[]>(uploadObservables.filter((obs: any) => obs !== undefined))
      .pipe(
        concatMap((urls: string[]) => {
          return this.http.post('/api/admin/exam/create-exam', this.param);
        })
      )
      .subscribe((res: any) => {
        this.spinnerService.hide();
        if (res?.success) {
          this.addSuccessEmit.emit();
          this.toastr.success(res?.message);
          this.bsModalRef.hide();
        } else
          this.toastr.error(res?.message);
      });
  }

  triggerFileInput(fileInput: any) {
    fileInput.click();
  }

  onFileSelected(event: any, index: number) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.selectedFiles[index] = files[0];
    } else {
      this.selectedFiles[index] = undefined;
    }
  }

  cancel() {
    this.bsModalRef.hide();
  }
}
