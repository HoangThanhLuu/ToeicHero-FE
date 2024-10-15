import {Component, EventEmitter, Output} from '@angular/core';
import {BsModalService} from "ngx-bootstrap/modal";
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


  constructor(private bs: BsModalService) {
  }

  openLogin() {
    this.bs.show(LoginComponent, {class: 'modal-lg'});
  }
}
