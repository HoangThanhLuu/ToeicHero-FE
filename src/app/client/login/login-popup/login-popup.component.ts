import {Component, OnInit} from '@angular/core';
import {BsModalService} from "ngx-bootstrap/modal";
import {LoginComponent} from "../login.component";

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})
export class LoginPopupComponent implements OnInit {
  constructor(private bs: BsModalService) {
  }

  ngOnInit(): void {
    this.bs.show(LoginComponent, {
      class: 'modal-lg modal-dialog-centered',
      ignoreBackdropClick: true,
    });
  }

}
