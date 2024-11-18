import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursePaymentRoutingModule } from './course-payment-routing.module';
import { CoursePaymentComponent } from './course-payment.component';
import {NzQRCodeComponent} from 'ng-zorro-antd/qr-code';
import {NzImageDirective} from 'ng-zorro-antd/image';


@NgModule({
  declarations: [
    CoursePaymentComponent
  ],
    imports: [
        CommonModule,
        CoursePaymentRoutingModule,
        NzQRCodeComponent,
        NzImageDirective
    ]
})
export class CoursePaymentModule { }
