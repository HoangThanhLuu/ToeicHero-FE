import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.scss'
})
export class ThankYouComponent implements OnInit {
  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private spinnerService: NgxSpinnerService) {
  }

  ngOnInit(): void {
    const examId = this.route.snapshot.params;
    this.route.queryParams.subscribe(params => {
      const p = params['s'];
      if(p === 'success') {
      }
    });
  }

}
