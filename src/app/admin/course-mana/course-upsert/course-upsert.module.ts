import {NgModule} from '@angular/core';

import {CourseUpsertRoutingModule} from './course-upsert-routing.module';
import {CourseUpsertComponent} from './course-upsert.component';
import {ShareAdminModule} from '../../share-admin/share-admin.module';
import {EditorComponent} from '@tinymce/tinymce-angular';
import {NzBadgeComponent} from 'ng-zorro-antd/badge';
import {NzAutocompleteModule} from 'ng-zorro-antd/auto-complete';
import {NzInputDirective} from 'ng-zorro-antd/input';


@NgModule({
  declarations: [
    CourseUpsertComponent
  ],
  imports: [
    ShareAdminModule,
    CourseUpsertRoutingModule,
    EditorComponent,
    NzBadgeComponent,
    NzAutocompleteModule,
    NzInputDirective
  ]
})
export class CourseUpsertModule { }
