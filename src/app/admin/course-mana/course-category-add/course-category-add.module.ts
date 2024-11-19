import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseCategoryAddRoutingModule } from './course-category-add-routing.module';
import { CourseCategoryAddComponent } from './course-category-add.component';
import {EditorComponent} from '@tinymce/tinymce-angular';
import {FormsModule} from '@angular/forms';
import {TooltipModule} from 'ngx-bootstrap/tooltip';


@NgModule({
  declarations: [
    CourseCategoryAddComponent
  ],
  imports: [
    CommonModule,
    CourseCategoryAddRoutingModule,
    EditorComponent,
    FormsModule,
    TooltipModule
  ]
})
export class CourseCategoryAddModule { }
