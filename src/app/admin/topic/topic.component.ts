import {Component, OnInit} from '@angular/core';
import {AdminLibBaseCss2, AdminStyle} from '../admin.style';
import {BsModalService} from 'ngx-bootstrap/modal';
import {AddTopicComponent} from './add-topic/add-topic.component';
import {HttpClient} from '@angular/common/http';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from "@ngx-translate/core";
import {UpdateTopicComponent} from "./update-topic/update-topic.component";

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css',
    ...AdminLibBaseCss2,
    ...AdminStyle
  ]
})
export class TopicComponent implements OnInit {
  title: string = "Manage Topic";
  currentPage: string = "Topic";
  listTopic: any = [];


  constructor(private bsModalService: BsModalService,
              private http: HttpClient,
              private modal: NzModalService,
              private spinner: NgxSpinnerService,
              private translate: TranslateService,
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
        title: 'Add Topic'
      }
    });
    if (modalRef?.content) {
      modalRef.content.added.subscribe(() => {
        this.getListTopic();
      });
    }
  }

  trackByFn(index: number, item: any): any {
    return item.topicId;
  }

  deleteTopic(topic: any) {
    const confirmModal: NzModalRef = this.modal.create({
      nzTitle: `Confirm`,
      nzContent: `Do you want to delete this ${topic?.topicName} ?`,
      nzCentered: true,
      nzFooter: [
        {
          label: 'Cancel',
          onClick: () => confirmModal.destroy()
        }, {
          label: 'Agree',
          type: 'primary',
          onClick: () => {
            this.spinner.show();
            this.http.delete<any>(`/api/admin/topic/delete/${topic?.topicId}`)
              .subscribe((res: any) => {
                if (res?.success) {
                  const msg = this.translate.instant(`TOPIC.${res?.message}`);
                  if (res?.success) {
                    this.toast.success(msg);
                  } else {
                    this.toast.error(msg);
                  }
                  this.getListTopic();
                } else {
                  const msg = this.translate.instant(`TOPIC.${res?.message}`);
                  this.toast.error(msg);
                }
                this.spinner.hide();
                confirmModal.destroy();
              });
          }
        }
      ]
    });
  }

  editTopic(data: any) {
    const bsModalResult = this.bsModalService.show(UpdateTopicComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: 'Update Topic',
        isPopup: true,
        isShowImage: true,
        imageSrc: data.topicImage,
        params: {
          topicId: data.topicId,
          topicName: data.topicName
        }
      }
    });
    if (bsModalResult?.content?.modified) {
      bsModalResult.content.modified.subscribe(() => {
        this.getListTopic();
      });
    }
  }

}
