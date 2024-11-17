import {Component, Input} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NzBadgeComponent} from "ng-zorro-antd/badge";
import {TestModule} from "../../../test/test.module";
import {SafeHtmlPipe} from "../../../../common/pipe/safe-html.pipe";
import {NzRadioComponent} from "ng-zorro-antd/radio";
import {ShareClientModule} from '../../../share-client/share-client.module';

@Component({
  selector: 'app-detail-answer',
  standalone: true,
  imports: [
    FormsModule,
    NzBadgeComponent,
    ShareClientModule,
    TestModule,
    SafeHtmlPipe,
    NzRadioComponent
  ],
  templateUrl: './detail-answer.component.html',
  styleUrl: './detail-answer.component.scss'
})
export class DetailAnswerComponent {
  @Input() title: string = "Chi tiết đáp án:";
  @Input() isPopup: boolean = false;
  @Input() params: any = {
    questionImage: '',
    correctAnswer: '',
    questionContent: '',
    paragraph2: '',
    questionAudio: '',
    paragraph1: '',
    answerB:'',
    answerA: '',
    answerC:'',
    answerD:'',
    transcript:'',
    questionNumber: '',
    translateTranscript: '',
    selectedAnswer: '',
    questionImages:'',
    haveMultiImage:''
  };
}
