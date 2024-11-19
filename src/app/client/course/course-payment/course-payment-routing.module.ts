import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursePaymentComponent } from './course-payment.component';

const routes: Routes = [{ path: '', component: CoursePaymentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursePaymentRoutingModule { }
