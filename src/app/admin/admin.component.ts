import {Component, Input, OnInit} from '@angular/core';
import {navItems} from "./navbar/_nav";
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss',
      './assets/vendors/mdi/css/materialdesignicons.min.css',
      './assets/vendors/css/vendor.bundle.base.css']
})
export class AdminComponent implements OnInit{
  public navItems = navItems;
  ngOnInit(): void {
    console.log("navItems",navItems)
  }
}
