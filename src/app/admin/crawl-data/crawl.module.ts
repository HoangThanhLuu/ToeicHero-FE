import {NgModule} from '@angular/core';

import {CrawlRoutingModule} from './crawl-routing.module';
import {ShareAdminModule} from '../share-admin/share-admin.module';
import {CrawlComponent} from './crawl/crawl.component';
import {CrawlConfigComponent} from './crawl-config/crawl-config.component';
import {CrawlDataComponent} from './crawl-data.component';
import {UpdateConfigCrawlComponent} from './crawl-config/update-config-crawl/update-config-crawl.component';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {NzInputDirective} from 'ng-zorro-antd/input';


@NgModule({
  declarations: [
    CrawlComponent,
    CrawlConfigComponent,
    CrawlDataComponent,
    UpdateConfigCrawlComponent
  ],
    imports: [
        ShareAdminModule,
        CrawlRoutingModule,
        BsDatepickerModule,
        PopoverModule,
        NzInputDirective
    ]
})
export class CrawlModule {
}
