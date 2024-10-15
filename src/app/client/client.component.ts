import {Component, OnInit, Renderer2} from '@angular/core';
import {AddAssetsService} from "../add-assets.service";
import {Router} from "@angular/router";
import {NgwWowService} from "ngx-wow";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(private commonService: AddAssetsService, private router: Router, private wowService: NgwWowService) {
    this.wowService.init();
  }


  ngOnInit(): void {
    // this.commonService.initClient();
  }


}
