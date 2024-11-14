import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {NzModalService} from 'ng-zorro-antd/modal';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute} from '@angular/router';
import {AdminLibBaseCss3, AdminStyle2} from '../../admin.style';
import {concatMap} from 'rxjs/operators';
import {finalize, forkJoin, from, Observable} from 'rxjs';

@Component({
  selector: 'app-edit-question-part1',
  templateUrl: './edit-question-part1.component.html',
  styleUrls: ['./edit-question-part1.component.scss',
    ...AdminLibBaseCss3,
    ...AdminStyle2,
  ]
})
export class EditQuestionPart1Component implements OnInit {
  @Input() title: string = '';
  @Input() question: any;
  @Input() currentPart: any;
  isShowImage: boolean = false;
  imageSrc: string = '';
  selectedFileImage: any;
  selectedFileAudio: any;
  showBorderError: boolean = false;
  titleShow = '';
  @Output() addSuccessEmit = new EventEmitter();
  param: any = {
    questionId: '',
    questionImage: '',
    questionAudio: '',
    correctAnswer: '',
  }

  constructor(private toast: ToastrService,
              private http: HttpClient,
              private modal: NzModalService,
              private bsModalRef: BsModalRef,
              private spinnerService: NgxSpinnerService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (this.question) {
      if (this.question?.questionImage) {
        this.imageSrc = this.question?.questionImage;
        this.isShowImage = true;
      }
    }
    this.titleShow = `${this.title} ${this.currentPart?.partName} - Câu ${this.question?.questionNumber}`;
    this.param = {
      questionId: this.question?.questionId,
      questionImage: this.question?.questionImage,
      questionAudio: this.question?.questionAudio,
      correctAnswer: this.question?.correctAnswer,
    }
    this.selectedFileImage = this.question?.questionImage;
    this.selectedFileAudio = {name: this.question?.questionAudio};
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    this.handleFiles(file);
  }

  handleFiles(file: any) {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.isShowImage = true;
        this.imageSrc = `${e.target?.result}`;
        this.selectedFileImage = file;
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

  editQuestion() {
    if (!this.param.correctAnswer) {
      this.toast.error('Đáp án câu hỏi không được để trống');
      this.showBorderError = true;
      return;
    }

    this.spinnerService.show();
    const fileUploadObservables: Observable<any>[] = [];
    if (this.selectedFileImage) {
      fileUploadObservables.push(this.uploadFile(this.selectedFileImage, 0));
    }
    if (this.selectedFileAudio) {
      fileUploadObservables.push(this.uploadFile(this.selectedFileAudio, 1));
    }
    forkJoin(fileUploadObservables)
        .subscribe((urls: any[]) => {
      if (this.selectedFileImage && urls[0]) {
        this.param.questionImage = urls[0];
      } else if (this.selectedFileAudio && urls[0]) {
        this.param.questionAudio = urls[0];
      }

      if (this.selectedFileAudio && urls[1]) {
        this.param.questionAudio = urls[1];
      }
      this.updateQuestion();
    });

    if (fileUploadObservables.length === 0) {
      this.updateQuestion();
    }
  }

  private updateQuestion() {
    this.http.patch<any>('/api/admin/question/update-question', this.param)
      .pipe(finalize(() => this.spinnerService.hide()))
      .subscribe((res: any) => {
        if (res?.success) {
          this.toast.success(res?.message);
          this.addSuccessEmit.emit();
          this.bsModalRef.hide();
        } else {
          this.toast.error(res?.message);
        }
      });
  }

  triggerFileInput(fileInput: any) {
    fileInput.click();
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.selectedFileAudio = files[0];
    } else {
      this.selectedFileAudio = undefined;
    }
  }

  close() {
    this.bsModalRef.hide();
  }

  updateCorrectAnswer($event: Event) {
    this.param.correctAnswer = ($event.target as HTMLInputElement).value;
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
}
