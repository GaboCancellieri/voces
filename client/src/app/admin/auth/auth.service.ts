import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../users/user';
import { map } from 'rxjs/operators';
import { UrlService } from '../../window.provider.service';

@Injectable({
    providedIn: 'root'
  })

export class AuthService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

  constructor(
      public jwtHelper: JwtHelperService,
      private http: HttpClient,
      private urlService: UrlService,
    ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  login(username: string, password: string): any {
      return this.http.post<any>(`${this.urlService.getRestApiUrl()}/users/authenticate`, { username, password })
          .pipe(map(user => {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
              return user;
          }));
  }

  logout(): void {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }
}
