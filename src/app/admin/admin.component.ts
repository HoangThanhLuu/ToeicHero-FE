import {Component, HostListener, OnInit} from '@angular/core';
import {AdminLibBaseCss} from "./admin.style";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss',
    ...AdminLibBaseCss,
    './assets/css/style.css'
  ]
})
export class AdminComponent implements OnInit {
  isShow: boolean = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isShow = window.scrollY > 100;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  ngOnInit(): void {
  }
}
