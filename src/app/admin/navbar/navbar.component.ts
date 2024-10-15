import { Component, Input } from '@angular/core';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', '../assets/css/style.css']
})
export class NavbarComponent extends HeaderComponent{
  @Input() sidebarId: string = "sidebar";
  constructor(private classToggler: ClassToggleService) {
    super();
  }
}
