import {
  Component, EventEmitter,
  Input, Output
} from '@angular/core';
import {
  AdminLibBaseCss4,
  AdminStyle3
} from "../../../admin.style";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {BsModalRef} from "ngx-bootstrap/modal";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-update-template-email',
  templateUrl: './update-template-email.component.html',
  styleUrls: ['./update-template-email.component.scss', ...AdminLibBaseCss4, ...AdminStyle3]
})
export class UpdateTemplateEmailComponent {
  @Input() title: string = "Thêm Tempalte-email: ";
  @Input() isAdd = true;
  @Output() added = new EventEmitter();


  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private spinnerService: NgxSpinnerService,
              private bsModalRef: BsModalRef,
              private translate: TranslateService) {
  }

  userDarkMode: boolean = false;
  tinymceConfig = {
    selector: 'textarea',
    plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion',
    editimage_cors_hosts: ['picsum.photos'],
    menubar: 'file edit view insert format tools table help',
    toolbar: "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl",
    autosave_ask_before_unload: true,
    autosave_interval: '30s',
    autosave_prefix: '{path}{query}-{id}-',
    autosave_restore_when_empty: false,
    autosave_retention: '2m',
    image_advtab: true,
    link_list: [
      {title: 'My page 1', value: 'https://www.tiny.cloud'},
      {title: 'My page 2', value: 'http://www.moxiecode.com'}
    ],
    image_list: [
      {title: 'My page 1', value: 'https://www.tiny.cloud'},
      {title: 'My page 2', value: 'http://www.moxiecode.com'}
    ],
    image_class_list: [
      {title: 'None', value: ''},
      {title: 'Some class', value: 'class-name'}
    ],
    importcss_append: true,
    file_picker_callback: (callback: any, value: any, meta: any) => {
      /* Provide file and text for the link dialog */
      if (meta.filetype === 'file') {
        // open file picker

      }

      /* Provide image and alt text for the image dialog */
      if (meta.filetype === 'image') {
      }

      /* Provide alternative source and posted for the media dialog */
      if (meta.filetype === 'media') {
      }
    },
    templates: [
      {
        title: 'New Table',
        description: 'creates a new table',
        content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>'
      },
      {title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...'},
      {
        title: 'New list with dates',
        description: 'New List with dates',
        content: '<div class="mceTmpl"><span class="cdate">cdate</span><br><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>'
      }
    ],
    template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
    template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
    height: 600,
    image_caption: true,
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_class: 'mceNonEditable',
    contextmenu: 'link image table',
    skin: this.userDarkMode ? 'oxide-dark' : 'oxide',
    content_css: this.userDarkMode ? 'dark' : 'default',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
  };

  @Input() params: any = {
    name: '',
    templateContent: '',
    templateCode: '',
    subject: ''
  };

  doAction() {
    this.spinnerService.show();
    this.http.post('/api/email/template/update', this.params)
      .subscribe({
        next: (res: any) =>{
          const msg = this.translate.instant(`EMAIL.${res?.message}`);
          this.toastr.success(msg);
          this.added.emit('Ok');
          this.spinnerService.hide();
        },
        error: (res: any) => {
          const msg = this.translate.instant(`EMAIL.${res?.message}`);
          this.spinnerService.hide();
        }
      })
  }
  close() {
    this.bsModalRef.hide();
  }
}
