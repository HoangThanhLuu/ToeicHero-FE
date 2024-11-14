import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient, private renderer: Renderer2, private el: ElementRef) {
  }

  ngOnInit(): void {
    this.http.get('api/kommunicate/bot/get-bot-active')
      .subscribe({
        next: (res: any) => {
          this.loadKommunicateScript(res.data.script);
        },
        error: () => {
        }
      });
  }

  loadKommunicateScript(scriptContent: string): void {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.text = scriptContent;
    this.renderer.appendChild(this.el.nativeElement, script);
  }

}
