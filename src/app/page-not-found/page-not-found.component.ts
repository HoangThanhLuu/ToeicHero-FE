import {Component} from '@angular/core';
import {ClientModule} from '../client/client.module';

@Component({
  standalone: true,
  selector: 'app-page-not-found',
  imports: [ClientModule],
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {

}
