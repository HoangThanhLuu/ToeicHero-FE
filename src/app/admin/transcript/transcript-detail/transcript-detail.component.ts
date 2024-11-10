import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'app-transcript-detail',
  templateUrl: './transcript-detail.component.html',
  styleUrls: ['./transcript-detail.component.scss']
})
export class TranscriptDetailComponent {
  @Input() param = {
    transcript: '',
    translate: '',
  }
}
