import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseUpsertComponent } from './course-upsert.component';

const routes: Routes = [{ path: '', component: CourseUpsertComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseUpsertRoutingModule { }
