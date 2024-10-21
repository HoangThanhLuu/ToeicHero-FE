import {
  Component,
  OnInit
} from '@angular/core';
import {
  BsModalRef,
  BsModalService
} from "ngx-bootstrap/modal";
import {HttpClient} from "@angular/common/http";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {TemplateEmailDetailComponent} from "./template-email-detail/template-email-detail.component";

@Component({
  selector: 'app-template-email',
  templateUrl: './template-email.component.html',
  styleUrls: ['./template-email.component.scss']
})
export class TemplateEmailComponent implements OnInit {
  title: string = "Quản lý Template Email";
  currentPage: string = "Template Email";
  listTemplateEmail: any = [];
  private botIdToDelete: number | undefined;
  isVisible: boolean = false

  constructor(
    private bsModalService: BsModalService,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private bsModalRef: BsModalRef
  ) {
  }

  ngOnInit(): void {
    this.getListTemplateEmail();
  }

  getListTemplateEmail() {
    this.http.get('/api/email/template/all')
      .subscribe((res: any) => {
        this.listTemplateEmail = res;
      });
  }

  openDetail(data: any) {
    this.bsModalService.show(TemplateEmailDetailComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        templateContent: data.templateContent
      }
    });
  }
}
