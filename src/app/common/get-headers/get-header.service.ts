import {Injectable} from '@angular/core';
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GetHeaderService {

  getHeaderAuthencation() {
    const auth_token = window.localStorage.getItem('token');
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return headers;
  }

  postHeaderAuthencation() {
    const auth_token = window.localStorage.getItem('token');
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    headers = headers.set('Authorization', `${auth_token}`);
    return headers;
  }

}
