import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  constructor(private http: HttpClient) {
  }

  /**
   * Calling Google login API and fetching account details.
   * @param clientId
   * @param callback Callback to function
   */
  public authenticateUser(clientId: any) {
    let auth2: any;
    let result: any;
    gapi.load('auth2', function () {
      auth2 = gapi
        .auth2
        .init({client_id: clientId, scope: 'profile email'});
      //Login button reference
      let element: any = document.getElementById('google-login-button');
      auth2.attachClickHandler(element, {}, function (googleUser: any) {
        //Getting profile object
        let profile = googleUser.getBasicProfile();
        const result = {
          name: profile.getName(),
          image: profile.getImageUrl(),
          email: profile.getEmail()
        };
        console.log(result);
      }, function (error: any) {
        alert(JSON.stringify(error, undefined, 2));
      });
    });
  }
}
