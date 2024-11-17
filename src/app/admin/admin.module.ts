import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {AdminComponent} from './admin.component';
import {NavbarComponent} from './navbar/navbar.component';

import {AdminRoutingModule} from './admin-routing.module';
import {FooterAdminComponent} from './footer/footer.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {TranslateModule} from '@ngx-translate/core';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {FormsModule} from '@angular/forms';
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzTableModule} from 'ng-zorro-antd/table';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {ScoreComponent} from './score/score.component';
import {HomeComponent} from './home/home.component';
import {PageHeaderComponent} from './page-header/page-header.component';
import {NzPaginationComponent} from 'ng-zorro-antd/pagination';
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzImageDirective} from "ng-zorro-antd/image";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {BaseChartDirective} from 'ng2-charts';

@NgModule({
  declarations: [
    AdminComponent,
    NavbarComponent,
    FooterAdminComponent,
    ScoreComponent,
    HomeComponent
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        NgxSpinnerModule,
        TranslateModule,
        NzModalModule,
        NgOptimizedImage,
        FormsModule,
        NzPopconfirmDirective,
        NzInputDirective,
        NzTableModule,
        TooltipModule,
        PageHeaderComponent,
        NzPaginationComponent,
        NzColDirective,
        NzFormControlComponent,
        NzFormItemComponent,
        NzFormLabelComponent,
        NzImageDirective,
        NzOptionComponent,
        NzRowDirective,
        NzSelectComponent,
        BaseChartDirective
    ],
  exports: []
})
export class AdminModule {
}
