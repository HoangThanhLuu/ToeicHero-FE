import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AdminLibBaseCss3, AdminStyle2} from '../../admin.style';
import {CONSTANT} from '../../../common/constant';
import {Router} from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss', ...AdminLibBaseCss3, ...AdminStyle2]
})
export class HistoryComponent implements OnInit {
  title: string = 'User Exam History';
  currentPage: string = 'Exam';
  list: UserExamHistory[] = [];
  timeZone = CONSTANT.timeZone;

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.http.get('/api/exam-history/find-all')
      .subscribe({
        next: (res: any) => {
          if (res?.success) {
            this.list = res?.data;
          }
        }
      });
  }

  openHistroyDetail(userExamHistoryId: number) {
    // open history detail in new tab
    window.open(`/admin/exam/history-detail?id=${userExamHistoryId}`, '_blank');
  }

}

export interface UserExamHistory {
  userExamHistoryId: number;
  totalQuestion: number;
  numberOfCorrectAnswer: number;
  numberOfWrongAnswer: number;
  numberOfNotAnswer: number;
  numberOfCorrectAnswerPart1: number;
  numberOfCorrectAnswerPart2: number;
  numberOfCorrectAnswerPart3: number;
  numberOfCorrectAnswerPart4: number;
  numberOfCorrectAnswerPart5: number;
  numberOfCorrectAnswerPart6: number;
  numberOfCorrectAnswerPart7: number;

  numberOfCorrectListeningAnswer: number;
  numberOfWrongListeningAnswer: number;
  numberOfCorrectReadingAnswer: number;
  numberOfWrongReadingAnswer: number;

  totalScore: number;
  totalScoreReading: number;
  totalScoreListening: number;

  timeToDoExam: number;
  timeRemaining: number;

  isDone: boolean;
  isFullTest: boolean;
  listPart: string;

  totalLeave: number;
  totalOpenNewTab: number;

  examDate: Date;
  endTime: Date;

  user: UserExam;
  exam: Exam;
}

export interface UserExam {
  email: string;
}

export interface Exam {
  examName: string;
}
