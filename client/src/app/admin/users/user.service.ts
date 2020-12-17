import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';
import { UrlService } from 'src/app/window.provider.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  base = this.urlService.getRestApiUrl();

  constructor(
      private http: HttpClient,
      private urlService: UrlService,
      ) {}

  login(user: any): Observable<any> {
    return this.http.post<any>(this.base + '/loginAdmin', user).pipe(
      tap(res => this.setSession(res)),
      shareReplay()
    );
  }

  register(user: any): Observable<any> {
    return this.http.post(this.base + '/register', user);
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
