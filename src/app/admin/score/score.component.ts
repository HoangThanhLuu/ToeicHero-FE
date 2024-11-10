import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {AdminLibBaseCss2, AdminStyle} from '../admin.style';
import {NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder} from 'ng-zorro-antd/table';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss',
    ...AdminLibBaseCss2,
    ...AdminStyle
  ]
})
export class ScoreComponent implements OnInit{
  title: string = 'Quản lý tính điểm đề thi';
  currentPage: string = 'Tính điểm đề thi';
  listScore: any = [];
  listOfColumns: ColumnItem[] = [];
  editCache: { [key: number]: { edit: boolean; data: DataItem } } = {};
  tblLoading: boolean = false;
  showSaveAllBtn: boolean = false;
  formData: FormData = new FormData();

  constructor(private http: HttpClient,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.getListScore();
  }

  getListScore() {
    this.tblLoading = true;
    this.http.get('/api/score/list')
      .subscribe({
        next: (res: any) => {
          this.listScore = res.data;
          this.updateEditCache();
          this.getListColumn();
          this.tblLoading = false;
        },
        error: () => this.tblLoading = false
      });
  }

  trackByFn(index: number, item: any): any {
    return item.calculateScoreId;
  }

  startEdit(id: number): void {
    this.showSaveAllBtn = true;
    this.editCache[id].edit = true;
  }

  cancelEdit(id: number): void {
    const index = this.listScore.findIndex((item: any) => item.calculateScoreId === id);
    this.editCache[id] = {
      data: {...this.listScore[index]},
      edit: false
    };
    this.checkSaveAllBtn();
  }

  checkSaveAllBtn() {
    this.showSaveAllBtn = false;
    for (const id in this.editCache) {
      if (this.editCache[id].edit) {
        this.showSaveAllBtn = true;
        break;
      }
    }
  }

  updateEditCache(): void {
    // clear edit cache
    this.editCache = {};
    this.listScore.forEach((item: any) => {
      this.editCache[item.calculateScoreId] = {
        edit: false,
        data: {...item}
      };
    });
  }

  private getListColumn() {
    this.listOfColumns = [
      {
        name: 'Số câu đúng',
        sortOrder: 'ascend',
        sortFn: (a: DataItem, b: DataItem) => a.totalQuestion - b.totalQuestion,
        listOfFilter: [],
        filterFn: null,
        filterMultiple: true,
        sortDirections: ['ascend', 'descend', null],
      },
      {
        name: 'Điểm nghe',
        sortOrder: null,
        sortFn: (a: DataItem, b: DataItem) => a.scoreListening - b.scoreListening,
        listOfFilter: [],
        filterFn: null,
        filterMultiple: true,
        sortDirections: ['ascend', 'descend', null],
      },
      {
        name: 'Điểm đọc',
        sortOrder: null,
        sortFn: (a: DataItem, b: DataItem) => a.scoreReading - b.scoreReading,
        listOfFilter: [],
        filterFn: null,
        filterMultiple: true,
        sortDirections: ['ascend', 'descend', null],
      }
    ];
  }

  saveEdit(item: any) {
    this.tblLoading = true;
    const newData = this.editCache[item?.calculateScoreId].data;
    this.http.patch('/api/score/update', newData)
      .subscribe({
        next: (res: any) => {
          if (res?.success) {
            this.toast.success(res?.message);
            const index = this.listScore.findIndex((e: any) => e.calculateScoreId === item.calculateScoreId);
            Object.assign(this.listScore[index], newData);
            this.editCache[item?.calculateScoreId].edit = false;
            this.checkSaveAllBtn();
          } else {
            this.toast.error(res?.message);
          }
          this.tblLoading = false;
        },
        error: () => {
          this.tblLoading = false;
        }
      });
  }

  saveAll() {
    this.tblLoading = true;
    let listUpdate: any = [];
    for (const id in this.editCache) {
      if (this.editCache[id].edit) {
        listUpdate.push(this.editCache[id].data);
      }
    }
    this.http.patch('/api/score/update-all', listUpdate)
      .subscribe({
        next: (res: any) => {
          if (res?.success) {
            this.toast.success(res?.message);

            listUpdate.forEach((item: any) => {
              const index = this.listScore.findIndex((e: any) => e.calculateScoreId === item.calculateScoreId);
              Object.assign(this.listScore[index], item);
              this.editCache[item?.calculateScoreId].edit = false;
            });
            this.checkSaveAllBtn();
          } else {
            this.toast.error(res?.message);
          }
          this.tblLoading = false;
        },
        error: () => {
          this.tblLoading = false;
        }
      });
  }

  importFileScoreExcel() {
    this.tblLoading = true;
    this.http.post('/api/score/import-file-score', this.formData)
      .subscribe({
        next: (res: any) => {
          if (res?.success) {
            this.toast.success(res?.message);
            this.getListScore();
          } else {
            this.toast.error(res?.message);
          }
          this.tblLoading = false;
        },
        error: () => {
          this.tblLoading = false;
        }
      });
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.formData.append('file', files[0]);
      this.importFileScoreExcel();
    } else {
      this.formData.delete('file');
    }
  }

  triggerFileInput(fileInput: any) {
    fileInput.click();
  }
}

interface DataItem {
  calculateScoreId: number;
  scoreListening: number;
  scoreReading: number;
  totalQuestion: number;
}

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<DataItem> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<DataItem> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}
