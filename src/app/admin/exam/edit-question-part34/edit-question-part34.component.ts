import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {NzModalService} from "ng-zorro-antd/modal";
import {BsModalRef} from "ngx-bootstrap/modal";
import {NgxSpinnerService} from "ngx-spinner";
import {ActivatedRoute} from "@angular/router";
import {concatMap} from "rxjs/operators";
import {finalize, forkJoin, from, Observable} from "rxjs";
import {AdminLibBaseCss3, AdminStyle2} from "../../admin.style";

@Component({
    selector: 'app-edit-question-part34',
    templateUrl: './edit-question-part34.component.html',
    styleUrls: ['./edit-question-part34.component.scss',
        ...AdminLibBaseCss3,
        ...AdminStyle2,
    ]
})
export class EditQuestionPart34Component implements OnInit {
    @Input() title: string = '';
    @Input() question: any;
    @Input() currentPart: any;
    isShowImage: boolean = false;
    isShowAudio: boolean = false;
    imageSrc: string = '';
    selectedFileImage: any;
    selectedFileAudio: any;
    showBorderError: boolean[] = [false];
    @Output() addSuccessEmit = new EventEmitter();
    messageError: string = '';
    listAnswer = Array.from({length: 4});
    titleShow = '';
    isHasImage: boolean = false;
    param: any = {
        questionId: '',
        questionContent: '',
        answerA: '',
        answerB: '',
        answerC: '',
        answerD: '',
        questionImage: '',
        questionAudio: '',
        correctAnswer: '',
    }
    listHaveAudio: any = [];
    constructor(private toast: ToastrService,
                private http: HttpClient,
                private modal: NzModalService,
                private bsModalRef: BsModalRef,
                private spinnerService: NgxSpinnerService,
                private route: ActivatedRoute) {
        for (let i = 32; i < 101; i += 3) {
            this.listHaveAudio.push(`${i}`);
        }
    }

    ngOnInit(): void {
        this.isHasImage = this.isQuestionOfPart34HasImage();
        this.titleShow = `${this.title} ${this.currentPart?.partName} - Câu ${this.question?.questionNumber}`;
        this.param = {
            questionId: this.question?.questionId,
            questionContent: this.question?.questionContent,
            answerA: this.question?.answerA,
            answerB: this.question?.answerB,
            answerC: this.question?.answerC,
            answerD: this.question?.answerD,
            questionImage: this.question?.questionImage,
            questionAudio: this.question?.questionAudio,
            correctAnswer: this.question?.correctAnswer,
        }
        this.selectedFileImage = this.question?.questionImage;
        this.selectedFileAudio = {name: this.question?.questionAudio};
        this.listAnswer = [
            this.question?.answerA,
            this.question?.answerB,
            this.question?.answerC,
            this.question?.answerD,
        ];
        this.isShowAudio = this.listHaveAudio.includes(`${this.question?.questionNumber}`);
    }

    notValidQuestionParam() {
        let isNotValid = false;
        if (!this.param.questionContent) {
            this.messageError = 'Nội dung câu hỏi không được để trống!';
            this.showBorderError[0] = true;
            isNotValid = true;
        } else {
            this.showBorderError[0] = false;
        }
        if (!this.param.answerA) {
            this.messageError = 'Đáp án A không được để trống!';
            this.showBorderError[1] = true;
            isNotValid = true;
        } else {
            this.showBorderError[1] = false;
        }
        if (!this.param.answerB) {
            this.messageError = 'Đáp án B không được để trống!';
            this.showBorderError[2] = true;
            isNotValid = true;
        } else {
            this.showBorderError[2] = false;
        }
        if (!this.param.answerC) {
            this.messageError = 'Đáp án C không được để trống!';
            this.showBorderError[3] = true;
            isNotValid = true;
        } else {
            this.showBorderError[3] = false;
        }
        if (!this.param.answerD) {
            this.messageError = 'Đáp án D không được để trống!';
            this.showBorderError[4] = true;
            isNotValid = true;
        } else {
            this.showBorderError[4] = false;
        }
        if (!this.param.correctAnswer) {
            this.messageError = 'Đáp án đúng không được để trống!';
            this.showBorderError[5] = true;
            isNotValid = true;
        } else {
            this.showBorderError[5] = false;
        }
        return isNotValid;
    }

    editQuestion() {
        if (this.notValidQuestionParam()) {
            this.toast.error(this.messageError);
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

    close() {
        this.bsModalRef.hide();
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

    isQuestionOfPart34HasImage() {
        return this.question?.questionNumber == 62
            || this.question?.questionNumber == 65
            || this.question?.questionNumber == 68
            || this.question?.questionNumber == 95
            || this.question?.questionNumber == 98;
    }

    updateCorrectAnswer($event: any) {
        this.param.correctAnswer = $event.target.value;
    }

    updateQuestionContent($event: any) {
        this.param.questionContent = $event.target.value;
    }

    updateAnswer($event: any, i: number) {
        this.listAnswer[i] = $event.target.value;
        switch (i) {
            case 0:
                this.param.answerA = $event.target.value;
                break;
            case 1:
                this.param.answerB = $event.target.value;
                break;
            case 2:
                this.param.answerC = $event.target.value;
                break;
            case 3:
                this.param.answerD = $event.target.value;
                break;
        }
    }

    updateQuestion() {
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
}
