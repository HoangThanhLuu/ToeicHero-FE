import {Component, OnInit, Renderer2} from '@angular/core';
import {Router} from "@angular/router";
import {NgwWowService} from "ngx-wow";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(private router: Router, private wowService: NgwWowService, private http: HttpClient) {
    // this.wowService.init();
  }


  ngOnInit(): void {
    this.http.get('/api/test', {responseType: 'text'})
      .subscribe((res: any) => {
      console.log(res);
    });
  }


}
