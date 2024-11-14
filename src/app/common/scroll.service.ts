import {Injectable} from '@angular/core';
import {BehaviorSubject, fromEvent, throttleTime} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private scrollSubject = new BehaviorSubject<number>(0);
  scroll$ = this.scrollSubject.asObservable();

  constructor() {
    fromEvent(window, 'scroll')
      .pipe(throttleTime(200))
      .subscribe(() => {
        this.scrollSubject.next(window.scrollY);
      });
  }

  scrollToTop(): void {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
}
