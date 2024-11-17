import {Component, OnInit} from '@angular/core';
import {AdminStyle} from '../admin.style';
import {BsModalService} from "ngx-bootstrap/modal";
import {HttpClient} from "@angular/common/http";
import {NzModalService} from "ng-zorro-antd/modal";
import {NgxSpinnerService} from "ngx-spinner";
import {TranslateService} from "@ngx-translate/core";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'
  ]
})
export class HomeComponent implements OnInit{
  title: string = 'Home';
  currentPage: string = 'Home';
listExam: any;
  constructor(
    private bsModalService: BsModalService,
    private http: HttpClient,
    private modal: NzModalService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private router: Router,
    private toast: ToastrService) {
  }
  ngOnInit(): void {
    this.getList();
  }

  getList(){
    this.http.get(`/api/statistic/exam/list`)
      .subscribe((res: any) => {
        this.listExam = res?.data;
      });
  }
 viewDetai(examId: any){
   this.router.navigate([`/admin/statistic/exam/${examId}`]).then();
 }

}
