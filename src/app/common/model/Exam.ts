import {Topic} from './Topic';
import {Part} from './Part';

export class Exam {
  examId: string = '';
  examName: string = '';
  examImage: string = '';
  examAudio: string = '';
  audioPart1: string = '';
  audioPart2: string = '';
  audioPart3: string = '';
  audioPart4: string = '';
  status: string = '';
  numberOfUserDoExam: number = 0;
  price: number = 0;
  free: boolean = false;
  fromDate: Date = new Date();
  toDate: Date = new Date();
  topic: Topic = new Topic();
  parts: Part[] = [];
}
