import { Component } from '@angular/core';
import {AdminLibBaseCss2, AdminStyle} from "../admin.style";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css',
    ...AdminLibBaseCss2,
    ...AdminStyle]
})
export class FooterAdminComponent  {
  date: Date = new Date();
}
