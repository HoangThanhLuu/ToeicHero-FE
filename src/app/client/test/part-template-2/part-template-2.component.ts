import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-part-template-2',
  templateUrl: './part-template-2.component.html',
  styleUrls: ['./part-template-2.component.scss']
})
export class PartTemplate2Component {
  // cho part 1, 2, 5
  @Input() exam: any = {};
  @Input() part: any = {};
  @Input() selectedAnswer: any = {};
  @Input() numberQuestion: any = 0;
  @Input() indexPart: any = 0;

  @Output() selectedAnswerChange = new EventEmitter<any>();
  @Output() changePart = new EventEmitter<any>();

  changeStateButton(event: any, questionId: any, partCode: any) {
    this.selectedAnswerChange.emit({
      questionId,
      answer: event
    });
  }

  nextPart() {
    this.changePart.emit('next');
  }

  previousPart() {
    this.changePart.emit('previous');
  }
}
