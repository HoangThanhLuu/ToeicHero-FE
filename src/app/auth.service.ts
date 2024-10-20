import {Injectable} from '@angular/core';
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isTokenExpired(token: string): boolean {
    if (!token) {
      return true;
    }
    const decodedToken: any = jwtDecode(token);
    const expirationTime = decodedToken.exp;
    const currentTime = Date.now() / 1000;
    return expirationTime < currentTime;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
  }
}
