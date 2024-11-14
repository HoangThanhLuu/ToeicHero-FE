import {isDevMode} from "@angular/core";

export const BASE_URL_LOCAL = 'http://localhost:8080';
export const BASE_URL = 'https://toeicute-38c2b32a7c77.herokuapp.com';

export const FACEBOOK_APP_ID = isDevMode() ? '826944865787994' : '350779770997898';

export const CONSTANT = {
  formatDate: 'dd-MM-yyyy H:mm:ss',
  formatDate2: 'dd-MM-yyyy ',
  timeZone: '+0700',
  error: 'Đã có lỗi xảy ra, vui lòng thử lại sau',
  defaultLocale: 'en_US',
  formatAnswer: 'answer',
  formatStateButton: 'stateButton',
  formatSelectAnswer: 'selectAnswer',
  directLink: 'directLink',
}
