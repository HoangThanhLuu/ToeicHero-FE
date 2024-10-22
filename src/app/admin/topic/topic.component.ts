import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AdminLibBaseCss2, AdminStyle} from '../admin.style';
import {BsModalService} from 'ngx-bootstrap/modal';
import {AddTopicComponent} from './add-topic/add-topic.component';
import {HttpClient} from '@angular/common/http';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css',
    ...AdminLibBaseCss2,
    ...AdminStyle
  ]
})
export class TopicComponent implements OnInit {
  title: string = "Quản lý bộ đề thi";
  currentPage: string = "Bộ đề thi";
  listTopic: any = [];


  constructor(private bsModalService: BsModalService,
              private http: HttpClient,
              private modal: NzModalService,
              private spinner: NgxSpinnerService,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.getListTopic();
  }

  getListTopic() {
    this.http.get('/api/admin/topic/list')
      .subscribe((res: any) => {
        this.listTopic = res?.content;
      });
  }

  addTopic() {
    const modalRef = this.bsModalService.show(AddTopicComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Thêm bộ đề thi'
      }
    });
    if (modalRef && modalRef.content) {
      modalRef.content.added.subscribe(() => {
        this.getListTopic();
      });
    }
  }

  trackByFn(index: number, item: any): any {
    return item.topicId;
  }


  editTopic(topicId: any) {

  }

  deleteTopic(topic: any) {
    const confirmModal: NzModalRef = this.modal.create({
      nzTitle: `Xác nhận`,
      nzContent: `Bạn có muốn xóa bộ đề thi ${topic?.topicName} không?`,
      nzCentered: true,
      nzFooter: [
        {
          label: 'Hủy',
          onClick: () => confirmModal.destroy()
        }, {
          label: 'Đồng ý',
          type: 'primary',
          onClick: () => {
              this.spinner.show();
              this.http.delete<any>(`/api/admin/topic/delete/${topic?.topicId}`)
                .subscribe((res: any) => {
                    if(res?.success) {
                      this.toast.success(res?.message);
                      this.getListTopic();
                    }else{
                      this.toast.error(res?.message);
                    }
                    this.spinner.hide();
                  confirmModal.destroy();
                });
          }
        }
      ]
    });
  }
}
