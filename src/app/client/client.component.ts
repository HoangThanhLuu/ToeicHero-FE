import {Component, OnInit, Renderer2} from '@angular/core';
import {Router} from "@angular/router";
import {NgwWowService} from "ngx-wow";
import {HttpClient} from "@angular/common/http";
import {BsModalService} from "ngx-bootstrap/modal";
import {AuthServiceService} from "../auth-service.service";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  constructor(private router: Router, private wowService: NgwWowService, private http: HttpClient, private bs: BsModalService) {

  }

  ngOnInit(): void {

  }
}
