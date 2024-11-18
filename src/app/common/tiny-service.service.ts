import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResolveFn} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TinyServiceService {
  userDarkMode: boolean = false;
  tinymceConfig: TinyConfig = new TinyConfig();

  constructor(private http: HttpClient) {
  }

  set setTinyConfig(config: TinyConfig) {
    this.tinymceConfig = config;
  }

  get getTinyConfig(): TinyConfig {
    return this.tinymceConfig;
  }

  getTinyConfigObservable(height: number = 600): Observable<TinyConfig> {
    return new Observable<TinyConfig>((subscriber: any) => {
      const sub = this.http.get('/api/tiny-config/get-active').subscribe({
        next: (res: any) => {
          this.tinymceConfig.apiKey = res.data.apiKey;
          this.tinymceConfig.config.height = height;
          subscriber.next(this.tinymceConfig);
        },
        error: (err: any) => {
          subscriber.error(err);
        },
        complete: () => {
          subscriber.next(this.tinymceConfig);
          subscriber.complete();
        }
      });
      return () => sub.unsubscribe();
    });
  }
}

export const tinyResolver: ResolveFn<Observable<TinyConfig>> = () => {
  return inject(TinyServiceService).getTinyConfigObservable();
}

export class TinyConfig {
  config: Config = new Config();
  apiKey: string = '40ku6oculogk4tet8h0si5m7sg4z8qm85i5xl4xxgj0n3y3t';
}

export class Config {
  selector: string = 'textarea';
  plugins: string = 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion';
  editimage_cors_hosts: string[] = ['picsum.photos'];
  menubar: string = 'file edit view insert format tools table help';
  toolbar: string = "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl";
  autosave_ask_before_unload: boolean = true;
  autosave_interval: string = '30s';
  autosave_prefix: string = '{path}{query}-{id}-';
  autosave_restore_when_empty: boolean = false;
  autosave_retention: string = '2m';
  image_advtab: boolean = true;
  link_list: [] = [];
  image_list: [] = [];
  image_class_list: [] = [];
  importcss_append: boolean = true;
  file_picker_callback: any = (callback: any, value: any, meta: any) => {
    /* Provide file and text for the link dialog */
    if (meta.filetype === 'file') {
    }

    /* Provide image and alt text for the image dialog */
    if (meta.filetype === 'image') {
    }

    /* Provide alternative source and posted for the media dialog */
    if (meta.filetype === 'media') {
    }
  };
  templates: [] = [];
  template_cdate_format: string = '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]';
  template_mdate_format: string = '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]';
  height: number = 600;
  image_caption: boolean = true;
  quickbars_selection_toolbar: string = 'bold italic | quicklink h2 h3 blockquote quickimage quicktable';
  noneditable_class: string = 'mceNonEditable';
  contextmenu: string = 'link image table';
  skin: string = 'oxide';
  content_css: string = 'default';
  content_style: string = 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
}
