import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {BsModalRef} from "ngx-bootstrap/modal";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit{
  @Input() title: string = "Thêm Blog: ";
  @Input() isShowImage: boolean = false;
  @Input() imageSrc: string | undefined = "";
  @Output() addSuccessEmit = new EventEmitter();
  @Output() modified = new EventEmitter();
  @Input() isPopup: boolean = false;
  @Input() isAdd = true;
  showBorderError: any = [];
  formData = new FormData();
  fileImage: string | null = null;
  params: any ={
    blogId: '',
    author: '',
    content: '',
    title:'',
    image: '',
    summary: '',
    createdAt: '',
    updatedAt: ''
  }

  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private spinnerService: NgxSpinnerService,
              private bsModalRef: BsModalRef,
              private translate: TranslateService) {
  }

  ngOnInit(): void {

    }
  addBlog(): void {
    if(!this.params.author) {
      this.toastr.error('Vui lòng nhập tác giả');
      this.showBorderError[0] = true;
      return;
    }else{
      this.showBorderError[0] = false;
    }
    if(!this.params.title) {
      this.toastr.error('Vui lòng nhập tiêu đề');
      this.showBorderError[1] = true;
      return;
    }else{
      this.showBorderError[1] = false;
    }
    if(!this.params.content) {
      this.toastr.error('Vui lòng nội dung');
      this.showBorderError[2] = true;
      return;
    }else{
      this.showBorderError[2] = false;
    }
    this.spinnerService.show();
    this.formData.append('author', this.params.author);
    this.formData.append('title', this.params.title);
    this.formData.append('summary', this.params.summary);
    this.formData.append('content', this.params.content);
    this.http.post('/api/blog/create',this.formData )
      .subscribe({
        next: (res: any) => {
          const msg = this.translate.instant(`BLOG.${res?.message}`);
          this.toastr.success(msg);
          this.addSuccessEmit.emit();
          this.spinnerService.hide();
          if(this.isPopup){
            this.close();
          }
        },
        error: (res: any) => {
          const msg = this.translate.instant(`BLOG.${res?.message}`);
          this.spinnerService.hide();
          console.log(res);
        }
      })
    this.formData.delete('author');
    this.formData.delete('title');
    this.formData.delete('summary');
    this.formData.delete('content');
    this.formData.delete('file');
  }
  modifyBlog(){
    this.spinnerService.show();
    this.formData.append('blogId', this.params.blogId);
    this.formData.append('author', this.params.author);
    this.formData.append('title', this.params.title);
    this.formData.append('summary', this.params.summary);
    this.formData.append('content', this.params.content);
    this.http.patch(`/api/blog/update`,this.formData)
      .subscribe({
        next: (res: any) => {
          const msg = this.translate.instant(`BLOG.${res?.message}`);
          this.toastr.success(msg);
          this.modified.emit();
          this.spinnerService.hide();
          if(this.isPopup){
            this.close();
          }
        },
        error: (res: any) => {
          const msg = this.translate.instant(`BLOG.${res?.message}`);
          this.spinnerService.hide();
        }
      })
  }
  handleFileInput(event: any) {
    const file = event.target.files[0];
    this.handleFiles(file);
  }
  close() {
    this.bsModalRef.hide();
  }
  handleFiles(file: any) {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.isShowImage = true;
        this.fileImage = `${e.target?.result}`;
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
}