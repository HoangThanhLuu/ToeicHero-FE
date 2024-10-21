import {NgModule} from '@angular/core';
import {
  CommonModule,
  NgOptimizedImage
} from '@angular/common';
import {ClientComponent} from './client.component';
import {HomeComponent} from './home/home.component';
import {ClientRoutingModule} from "./client-routing.module";
import {HeaderComponent} from './header/header.component';
import {LoginComponent} from './login/login.component';
import {FooterComponent} from './footer/footer.component';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NavbarComponent} from './navbar/navbar.component';
import {CarouselComponent} from './carousel/carousel.component';
import {ServiceComponent} from './service/service.component';
import {CarouselModule} from "ngx-owl-carousel-o";
import {TopbarComponent} from './topbar/topbar.component';
import {AboutComponent} from './about/about.component';
import {TestComponent} from './test/test.component';
import {OtpConfirmComponent} from './login/otp-confirm/otp-confirm.component';
import {PageHeaderComponent} from './page-header/page-header.component';
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NgxSpinnerModule} from "ngx-spinner";
import {ListTestComponent} from './list-test/list-test.component';
import {ProfileComponent} from './profile/profile.component';
import {UpdateProfileComponent} from './profile/update-profile/update-profile.component';
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzEmptyModule} from "ng-zorro-antd/empty";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzButtonModule} from "ng-zorro-antd/button";
import {StartComponent} from './test/start/start.component';
import {AudioPartComponent} from './test/audio-part/audio-part.component';
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzImageModule} from "ng-zorro-antd/image";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {LoginPopupComponent} from './login/login-popup/login-popup.component';
import {ResultComponent} from './test/result/result.component';
import {PracticeComponent} from './test/practice/practice.component';
import {NzCardModule} from "ng-zorro-antd/card";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzListModule} from "ng-zorro-antd/list";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {ChangePasswordComponent} from './profile/change-password/change-password.component';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzTimePickerModule} from "ng-zorro-antd/time-picker";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {HistoryExamComponent} from './history-exam/history-exam.component';
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import {NzTableModule} from "ng-zorro-antd/table";
import {HistoryExamDetailComponent} from './history-exam/history-exam-detail/history-exam-detail.component';
import {GoogleSigninButtonModule} from "@abacritt/angularx-social-login";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import { PartTemplate1Component } from './test/part-template-1/part-template-1.component';
import { PartTemplate2Component } from './test/part-template-2/part-template-2.component';
import { PartTemplate3Component } from './test/part-template-3/part-template-3.component';

@NgModule({
  declarations: [
    ClientComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    FooterComponent,
    NavbarComponent,
    CarouselComponent,
    ServiceComponent,
    TopbarComponent,
    AboutComponent,
    TestComponent,
    OtpConfirmComponent,
    PageHeaderComponent,
    ListTestComponent,
    ProfileComponent,
    UpdateProfileComponent,
    StartComponent,
    AudioPartComponent,
    LoginPopupComponent,
    ResultComponent,
    PracticeComponent,
    ChangePasswordComponent,
    HistoryExamComponent,
    HistoryExamDetailComponent,
    PartTemplate1Component,
    PartTemplate2Component,
    PartTemplate3Component,
  ],
  imports: [
    NgbModule,
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    FontAwesomeModule,
    CarouselModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    NzAvatarModule,
    NgxSpinnerModule,
    NzTagModule,
    NzEmptyModule,
    NzTabsModule,
    NzCheckboxModule,
    NzGridModule,
    NzButtonModule,
    NzRadioModule,
    NzImageModule,
    NzDividerModule,
    NzCardModule,
    NzIconModule,
    NzListModule,
    NzTypographyModule,
    NzFormModule,
    NzDatePickerModule,
    NzSelectModule,
    NzInputNumberModule,
    NzInputModule,
    NzTimePickerModule,
    TooltipModule,
    NzCollapseModule,
    NzTableModule,
    GoogleSigninButtonModule,
    NzToolTipModule,
  ],
  providers: [],
  exports: [
    HeaderComponent,
    NavbarComponent,
    FooterComponent
  ],
  bootstrap: [ClientComponent]
})
export class ClientModule {
}
