import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-part-template-3',
  templateUrl: './part-template-3.component.html',
  styleUrls: ['./part-template-3.component.scss']
})
export class PartTemplate3Component implements OnChanges {
  @Input() part: any = {};
  @Input() selectedAnswer: any = {};
  @Input() indexPart: any = 0;

  @Output() selectedAnswerChange = new EventEmitter<any>();
  @Output() changePart = new EventEmitter<any>();
  parentValueReceived = false
  listQuestion: any = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['part'] && !changes['part'].firstChange) {
      this.parentValueReceived = true;
      let groupIndex = 1;
      for (let i = 0; i < this.part?.questions.length; i++) {
        // take all question after question have questionHaveTranscript === true to listQuestion
        if (this.part?.questions[i].questionHaveTranscript) {
          this.listQuestion = [...this.listQuestion, {
            groupIndex,
            question: [this.part?.questions[i]]
          }];
          groupIndex++;
        } else {
          if (this.listQuestion.length > 0) {
            this.listQuestion[this.listQuestion.length - 1].question.push(this.part?.questions[i]);
          }
        }
      }
      console.log(this.listQuestion);
    }
  }

  previousPart() {
    this.changePart.emit('previous');
  }

  changeStateButton(event: any, questionId: any, partCode: any) {
    this.selectedAnswerChange.emit({
      questionId,
      answer: event
    });
  }
}
