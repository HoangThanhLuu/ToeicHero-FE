import {Component, EventEmitter, Output} from '@angular/core';
import {BsModalService} from "ngx-bootstrap/modal";
import {LoginComponent} from "../login/login.component";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


  constructor(private bs: BsModalService, private http: HttpClient) {
  }

  openLogin() {
    this.bs.show(LoginComponent, {class: 'modal-lg modal-dialog-centered'});
  }

  test() {
    this.http.get("/api/test")
      .subscribe((res: any) => {
        console.log(res);
        if(res?.succes) {
          alert('ket noi dc roi a');
        }
      });
  }
}
