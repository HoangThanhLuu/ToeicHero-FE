import {Component, Input, OnInit} from '@angular/core';
import {TinyConfig, TinyServiceService} from '../../../common/tiny-service.service';
import {HttpClient} from '@angular/common/http';
import {AdminLibBaseCss3, AdminStyle2} from '../../admin.style';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {forkJoin} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-course-upsert',
  templateUrl: './course-upsert.component.html',
  styleUrls: ['./course-upsert.component.scss', ...AdminLibBaseCss3, ...AdminStyle2]
})
export class CourseUpsertComponent implements OnInit {
  @Input() title: string = 'Add Course: ';
  @Input() isAdd = true;
  @Input() params: Params = new Params();
  @Input() isShowImage: boolean = false;
  @Input() imageSrc: string | undefined = '';
  formData = new FormData();
  tinymceConfig: TinyConfig = new TinyConfig();
  apiKeyTiny = '40ku6oculogk4tet8h0si5m7sg4z8qm85i5xl4xxgj0n3y3t';
  listCategory: Category[] = [];
  listCategoryClone: Category[] = [];

  constructor(
    private tinyService: TinyServiceService,
    private http: HttpClient,
    private toastr: ToastrService,
    private bsRef: BsModalRef,
    private spinner: NgxSpinnerService
  ) {
    this.tinymceConfig = tinyService.getTinyConfig;
  }

  ngOnInit(): void {
    const apiKeySub = this.http.get('/api/tiny-config/get-active');
    const categorySub = this.http.get('/api/category-course/all');
    forkJoin([apiKeySub, categorySub])
      .subscribe((res: any) => {
        this.apiKeyTiny = res[0]?.data?.apiKey;
        this.listCategory = res[1].data;
        this.listCategoryClone = [...this.listCategory];
        this.params.categoryCourseId = this.listCategory[0]?.categoryCourseId;
      });
  }

  doAction() {
    // validate
    if (!this.params.name) {
      this.toastr.error('Name is required');
      return;
    } else if (!this.params.price) {
      this.toastr.error('Price is required');
      return;
    }
    if (this.formData.get('file') === null && this.isAdd) {
      this.toastr.error('Thumbnail is required');
      return
    }
    this.spinner.show().then();

    // clear old form data to make sure no duplicate data if user click many times
    this.formData.delete('courseId');
    this.formData.delete('name');
    this.formData.delete('price');
    this.formData.delete('discount');
    this.formData.delete('salePrice');
    this.formData.delete('courseOverview');
    this.formData.delete('courseObjective');
    this.formData.delete('courseContent');
    this.formData.delete('courseSyllabus');
    this.formData.delete('courseReview');
    this.formData.delete('categoryCourseId');

    this.formData.append('courseId', this.params.courseId.toString());
    this.formData.append('name', this.params.name);
    this.formData.append('price', this.params.price.toString());
    this.formData.append('discount', this.params.discount.toString());
    this.formData.append('salePrice', this.params.salePrice.toString());
    this.formData.append('courseOverview', this.params.courseOverview);
    this.formData.append('courseObjective', this.params.courseObjective);
    this.formData.append('courseContent', this.params.courseContent);
    this.formData.append('courseSyllabus', this.params.courseSyllabus);
    this.formData.append('courseReview', this.params.courseReview);
    this.formData.append('categoryCourseId', this.params.categoryCourseId.toString());

    this.http.post('/api/course/upsert', this.formData)
      .subscribe((res: any) => {
        this.spinner.hide().then();
        if (res.success) {
          if (!this.isAdd) {
            this.bsRef.hide();
          }
          this.formData = new FormData();
          this.imageSrc = '';
          this.isShowImage = false;
          this.params = new Params();
          this.params.categoryCourseId = this.listCategory[0]?.categoryCourseId;
          this.toastr.success(this.isAdd ? 'Add course successfully' : 'Update course successfully');
        } else {
          this.toastr.error(res.message);
        }
      });


  }

  close(): void {
    this.bsRef.hide();
  }

  onInputPrice() {
    this.params.salePrice = this.params.price * (1 - this.params.discount / 100);
    // format 2 point decimal
    this.params.salePrice = Math.round(this.params.salePrice * 100) / 100;
  }

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    this.handleFiles(file);
  }

  handleFiles(file: any): void {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.isShowImage = true;
        this.imageSrc = `${e.target?.result}`;
        // clear old file
        this.formData.delete('file');
        // add new file
        this.formData.append('file', file);
      };
      reader.readAsDataURL(file);
    }
  }

  deleteImg() {
    this.formData.delete('file');
    this.isShowImage = false;
    this.imageSrc = '';
  }

  allowDrop(event: any) {
    event.preventDefault();
  }

  handleDrop(event: any) {
    event.preventDefault();
    const files = event.dataTransfer.files[0];
    this.handleFiles(files);
  }

  onInputCate(event: Event) {
    const value = (event.target as HTMLSelectElement).value ?? '';
    this.listCategoryClone = this.listCategory.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));
  }
}

export class Params {
  courseId: number = -1;
  name: string = '';
  price: number = 0;
  discount: number = 0;
  salePrice: number = 0;
  thumbnail: string = '';
  courseOverview: string = '';
  courseObjective: string = '';
  courseContent: string = '';
  courseSyllabus: string = '';
  courseReview: string = '';
  categoryCourseId: number = -1;
}

export interface Category {
  categoryCourseId: number;
  name: string;
  position: number;
}
