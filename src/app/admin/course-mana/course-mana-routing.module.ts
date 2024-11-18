import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CourseManaComponent} from './course-mana.component';
import {tinyResolver} from '../../common/tiny-service.service';

const routes: Routes = [
  {path: 'list', component: CourseManaComponent},
  {
    path: 'add',
    resolve: [tinyResolver],
    loadChildren: () => import('./course-upsert/course-upsert.module').then(m => m.CourseUpsertModule)
  },
  {
    path: 'list-category',
    loadChildren: () => import('./course-category/course-category.module').then(m => m.CourseCategoryModule)
  },
  {
    path: 'add-category',
    loadChildren: () => import('./course-category-add/course-category-add.module').then(m => m.CourseCategoryAddModule)
  },
  {
    path: 'course-register',
    loadChildren: () => import('./course-register/course-register.module').then(m => m.CourseRegisterModule)
  },
  { path: 'qr', loadChildren: () => import('./course-qr/course-qr.module').then(m => m.CourseQrModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseManaRoutingModule {
}
