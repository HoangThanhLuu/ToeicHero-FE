import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {AdminComponent} from './admin.component';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './navbar/navbar.component';

import {AdminRoutingModule} from "./admin-routing.module";
import {FooterAdminComponent} from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ExamComponent } from './exam/exam.component';
import { TopicComponent } from './topic/topic.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { AddTopicComponent } from './topic/add-topic/add-topic.component';
import { UsersComponent } from './users/users.component'
import {NzUploadModule} from "ng-zorro-antd/upload";
import {NzIconModule} from "ng-zorro-antd/icon";
import {FormsModule} from "@angular/forms";
import {NgxSpinnerModule} from "ngx-spinner";
import { AddExamComponent } from './exam/add-exam/add-exam.component';

@NgModule({
  declarations: [
    AdminComponent,
    HomeComponent,
    NavbarComponent,
    FooterAdminComponent,
    SidebarComponent,
    ExamComponent,
    TopicComponent,
    PageHeaderComponent,
    AddTopicComponent,
    UsersComponent,
    AddExamComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NzUploadModule,
    NzIconModule,
    NgOptimizedImage,
    FormsModule,
    NgxSpinnerModule,
  ],
})
export class AdminModule {
}
