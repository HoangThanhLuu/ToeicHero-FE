import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

@Component({
  selector: 'app-part-template-1',
  templateUrl: './part-template-1.component.html',
  styleUrls: ['./part-template-1.component.scss']
})
export class PartTemplate1Component {
  // cho part 3, 4, 6
  protected readonly Number = Number;
  @Input() exam: any = {};
  @Input() part: any = {};
  @Input() selectedAnswer: any = {};
  @Input() numberQuestion: any = 0;

  @Output() selectedAnswerChange = new EventEmitter<any>();
  @Output() changePart = new EventEmitter<any>();

  counter(i: number) {
    return new Array(i);
  }

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
