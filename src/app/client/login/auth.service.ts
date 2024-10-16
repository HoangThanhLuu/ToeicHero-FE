import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {
    }


    login(credentials: any) {
        return this.http.post('/users/authenticate', credentials);
    }

    //
    // isUserAuthenticated():boolean{
    //   return true;
    // }
    //
    // getLoggedInUser():any{
    //   return null;
    // }
}
