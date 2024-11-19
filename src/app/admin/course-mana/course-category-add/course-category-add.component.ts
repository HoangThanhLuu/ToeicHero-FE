import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {ToastrService} from 'ngx-toastr';
import {AdminLibBaseCss3, AdminStyle2} from '../../admin.style';

@Component({
  selector: 'app-course-category-add',
  templateUrl: './course-category-add.component.html',
  styleUrls: ['./course-category-add.component.scss', ...AdminStyle2, ...AdminLibBaseCss3]
})
export class CourseCategoryAddComponent {
  @Input() title: string = "Add Category Course: ";
  @Input() isAdd = true;
  @Output() added = new EventEmitter();
  @Input() params: Params = {
    categoryId: -1,
    categoryName: '',
    position: 0
  };

  constructor(private http: HttpClient,
              private toast: ToastrService,
              private bsModelRef: BsModalRef) {
  }

  doAction() {
    // validate params
    if (!this.params.categoryName || this.params.categoryName.trim().length === 0) {
      this.toast.error('Category name is required');
      return;
    } else if (this.params.position < 1 && !this.isAdd) {
      this.toast.error('Position must be greater than 0');
      return;
    }

    this.http.post('/api/category-course/upsert', this.params)
      .subscribe({
        next: _ => {
          this.toast.success('Add category course successfully');
          this.added.emit();
          this.params = {
            categoryId: -1,
            categoryName: '',
            position: 0
          };
          if (!this.isAdd) {
            this.close();
          }
        }, error: _ => {
          this.toast.error('Failed to add category course');
        }
      })
  }

  close(): void {
    this.bsModelRef.hide();
  }
}


export interface Params {
  categoryId: number;
  categoryName: string;
  position: number;
}
