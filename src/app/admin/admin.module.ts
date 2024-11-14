import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {AdminComponent} from './admin.component';
import {NavbarComponent} from './navbar/navbar.component';

import {AdminRoutingModule} from './admin-routing.module';
import {FooterAdminComponent} from './footer/footer.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {TranslateModule} from '@ngx-translate/core';
import {NzModalModule} from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [
    AdminComponent,
    NavbarComponent,
    FooterAdminComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxSpinnerModule,
    TranslateModule,
    NzModalModule,
    NgOptimizedImage
  ],
  exports: []
})
export class AdminModule {
}
