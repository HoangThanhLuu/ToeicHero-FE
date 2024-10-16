import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {NzModalService} from "ng-zorro-antd/modal";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {NgxSpinnerService} from "ngx-spinner";
import {ActivatedRoute} from "@angular/router";
import {AdminLibBaseCss3, AdminStyle2} from "../../admin.style";

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
  selectedFile: any;
  showBorderError: boolean = false;
  @Output() addSuccessEmit = new EventEmitter();
  formData = new FormData();
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
    if (this.question && this.question?.questionImage) {
      this.imageSrc = this.question?.questionImage;
      this.isShowImage = true;
    }
    this.title += ` ${this.currentPart?.partName} - Câu ${this.question?.questionNumber}`;
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
        this.formData.append('file', file);
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

  }

  triggerFileInput(fileInput: any) {
    fileInput.click();
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
    } else {
      this.selectedFile = undefined;
    }
  }

  close() {
    this.bsModalRef.hide();
  }

}
