import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CourseComponent} from './course.component';

const routes: Routes = [
  {path: '', component: CourseComponent},
  {
    path: 'course-detail',
    loadChildren: () => import('./course-detail/course-detail.module').then(m => m.CourseDetailModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./course-payment/course-payment.module').then(m => m.CoursePaymentModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule {
}
