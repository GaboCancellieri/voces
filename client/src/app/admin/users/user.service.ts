import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  base = 'http://localhost:3000/';

  constructor(
      private http: HttpClient,
      ) {}

  login(user: any): Observable<any> {
    return this.http.post<any>(this.base + 'api/loginAdmin', user).pipe(
      tap(res => this.setSession(res)),
      shareReplay()
    );
  }

  register(user: any): Observable<any> {
    return this.http.post(this.base + 'api/register', user);
  }

  private setSession(authResult) {
      const expiresAt = moment(authResult.expiration).toDate();
      localStorage.setItem('user', JSON.stringify(authResult.user));
      localStorage.setItem('token', authResult.token);
      localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
  }

  logout() {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
      return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }

  getExpiration() {
      const expiration = localStorage.getItem('expires_at');
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
  }

  getUserLogged() {
    if (this.isLoggedIn()) {
      return JSON.parse(localStorage.getItem('user'));
    } else {
      return null;
    }
  }
}
