import {Injectable} from '@angular/core';
import {DatePipe} from '@angular/common';
import {CONSTANT} from './constant';

@Injectable({
  providedIn: 'root'
})
export class DatetimeService {
  getFormatDate(value: Date, formatString: string) {
    return new DatePipe(CONSTANT.defaultLocale).transform(value, formatString, CONSTANT.timeZone) ?? '';
  }
}


