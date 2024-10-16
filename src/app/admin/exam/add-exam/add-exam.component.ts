import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AdminLibBaseCss3, AdminStyle2} from "../../admin.style";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css',
    ...AdminLibBaseCss3,
    ...AdminStyle2,
  ]
})
export class AddExamComponent implements OnInit{
  @Input() title: string = "Add Exam";
  @Output() addSuccessEmit = new EventEmitter();
  listTopic: any = [];
  audioParts = Array.from({ length: 4 });
  selectedFiles: any = [];

  param: any = {

  }
  constructor(private http: HttpClient, private toastr: ToastrService, private spinnerService: NgxSpinnerService) {
  }
  ngOnInit(): void {
    this.getListTopic();
  }

  private getListTopic() {
    this.http.get('/api/admin/topic/list')
      .subscribe((res: any) => {
      if(res?.success) {
        this.listTopic = res?.data;
      }
    })
  }

  addNewExam() {
    this.spinnerService.show();
    this.param.audioParts = [];
    this.audioParts.forEach((item: any, index: number) => {
      if(this.selectedFiles[index]) {
        this.param.audioParts.push(this.selectedFiles[index]);
      }
    })
    this.http.post('/api/admin/exam/add', this.param)
      .subscribe((res: any) => {
        this.spinnerService.hide();
        if (res?.success) {
          this.addSuccessEmit.emit();
          this.toastr.success(res?.message);
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
}
