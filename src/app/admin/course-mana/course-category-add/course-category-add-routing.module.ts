import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseCategoryAddComponent } from './course-category-add.component';

const routes: Routes = [{ path: '', component: CourseCategoryAddComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseCategoryAddRoutingModule { }
