import {Component, OnInit} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {HttpClient} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {Router} from '@angular/router';
import {AdminLibBaseCss3, AdminStyle2} from '../../admin.style';
import {CourseCategoryAddComponent} from '../course-category-add/course-category-add.component';

@Component({
  selector: 'app-course-category',
  templateUrl: './course-category.component.html',
  styleUrls: ['./course-category.component.scss', ...AdminStyle2, ...AdminLibBaseCss3]
})
export class CourseCategoryComponent implements OnInit {
  title: string = 'Manager Category Course';
  currentPage: string = 'Category Course';
  listData: Category[] = [];

  constructor(
    private bsModalService: BsModalService,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private modal: NzModalService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getListData();
  }

  private getListData() {
    this.http.get('/api/category-course/all')
      .subscribe((res: any) => {
        if (res.success) {
          this.listData = res.data;
        } else {
          this.toastr.error('Failed to get data');
        }
      });
  }

  openFormAdd() {
    this.router.navigate(['/admin/course-mana/add-category']).then();
  }

  deleteTemplate(id: any) {
    this.http.delete(`/api/category-course/delete/${id}`)
      .subscribe({
        next: _ => {
          this.toastr.success('Delete category course successfully');
          this.getListData();
        },
        error: _ => {
          this.toastr.error('Failed to delete category course');
        }
      })
  }

  update(data: Category) {
    const bsRef = this.bsModalService.show(CourseCategoryAddComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Update Category Course',
        isAdd: false,
        params: {
          categoryId: data.categoryCourseId,
          categoryName: data.name,
          position: data.position
        }
      }
    });
    bsRef?.content?.added.subscribe(() => {
      this.getListData();
    });
  }

  actionPosition(categoryCourseId: number, position: number, index: number) {
    if (index === 0 && position === -1) {
      this.toastr.warning('This is the first position');
      return;
    } else if (index === this.listData.length - 1 && position === 1) {
      this.toastr.warning('This is the last position');
      return;
    }

    const body = {
      categoryId: categoryCourseId,
      position: position
    };
    this.http.patch(`/api/category-course/update-position`, body)
      .subscribe({
        next: _ => {
          this.toastr.success('Update position successfully');
          this.getListData();
        },
        error: _ => {
          this.toastr.error('Failed to update position');
        }
      });
  }
}

export interface Category {
  categoryCourseId: number;
  name: string;
  position: number;
}
