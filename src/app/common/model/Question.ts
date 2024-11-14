import {QuestionImage} from './QuestionImage';

export class Question {
  questionId: number = 0;
  questionNumber: number = 0;
  questionContent: string = '';
  questionImage: string = '';
  questionAudio: string = '';
  answerA: string = '';
  answerB: string = '';
  answerC: string = '';
  answerD: string = '';
  correctAnswer: string = '';
  questionHaveTranscript: boolean = false;
  haveMultiImage: boolean = false;
  numberQuestionInGroup: number = 0;
  transcript: string = '';
  translateTranscript: string = '';
  questionImages: QuestionImage[] = [];
}
