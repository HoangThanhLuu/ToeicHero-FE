import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NzModalService} from "ng-zorro-antd/modal";
import {BsModalService} from "ngx-bootstrap/modal";
import {NgxSpinnerService} from "ngx-spinner";
import {AuthService} from "../../../auth.service";
import {GetHeaderService} from "../../../common/get-headers/get-header.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private modal: NzModalService,
              private bsModalService: BsModalService,
              private spinner: NgxSpinnerService,
              private auth: AuthService,
              private getHeaderService: GetHeaderService) {

    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }
  ngOnInit(): void {

  }


}
