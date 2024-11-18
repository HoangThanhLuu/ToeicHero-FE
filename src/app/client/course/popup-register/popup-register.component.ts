import {Component, EventEmitter, Output} from '@angular/core';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzModalFooterDirective, NzModalRef} from 'ng-zorro-antd/modal';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-popup-register',
  standalone: true,
  imports: [
    NzButtonComponent,
    NzModalFooterDirective,
    FormsModule
  ],
  templateUrl: './popup-register.component.html',
  styleUrl: './popup-register.component.scss'
})
export class PopupRegisterComponent {
  params: Param = new Param();

  constructor(private http: HttpClient,
              private bsRef: NzModalRef,
              private router: Router,
              private toast: ToastrService) {
  }

  submit() {
    this.http.post('/api/course-register/create', this.params)
      .subscribe({
        next: (res: any) => {
          if (res.success) {
            this.toast.success('Đăng ký thành công');
            this.bsRef.destroy();
            this.router.navigate(['/course/payment/']).then();
          } else {
            this.toast.error('Đăng ký thất bại');
          }
        }
      });
  }
}


export class Param {
  name: string = '';
  phone: string = '';
  email: string = '';
}
