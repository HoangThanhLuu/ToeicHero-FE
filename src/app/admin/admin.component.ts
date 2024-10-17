import {Component, Input, OnInit} from '@angular/core';
import {AdminLibBaseCss, AdminStyle} from "./admin.style";
import {AddAssetsService} from "../add-assets.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss',
    ...AdminLibBaseCss,
    './assets/css/style.css'
  ]
})
export class AdminComponent implements OnInit {
  constructor(private assetService: AddAssetsService) {
  }

  ngOnInit(): void {
  }
}
