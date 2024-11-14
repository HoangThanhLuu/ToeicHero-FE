import {isDevMode} from "@angular/core";

export const BASE_URL = 'http://localhost:8080';

export const FACEBOOK_APP_ID = isDevMode() ? '826944865787994' : '350779770997898';

export const CONSTANT = {
    formatDate: 'dd-MM-yyyy H:mm:ss',
    formatDate2: 'dd-MM-yyyy ',
    timeZone: '+0700'
}
