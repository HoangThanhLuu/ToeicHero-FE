import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseQrComponent } from './course-qr.component';

const routes: Routes = [{ path: '', component: CourseQrComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseQrRoutingModule { }
