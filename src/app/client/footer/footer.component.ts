import { Component } from '@angular/core';
import {faEnvelope, faPhone, faSquare} from '@fortawesome/free-solid-svg-icons';
import {faFacebook, faInstagramSquare, faSkype} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {


  protected readonly faFacebook = faFacebook;
  protected readonly faEnvelope = faEnvelope;
  protected readonly faSquare = faSquare;
  protected readonly faInstagramSquare = faInstagramSquare;
  protected readonly faSkype = faSkype;
  protected readonly faPhone = faPhone;
}
