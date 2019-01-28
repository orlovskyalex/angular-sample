import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, retryWhen, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { SignInData, SignUpData } from '../interfaces/auth-data.interface';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { UserResponse } from '../interfaces/user-response.interface';
import { User } from '../models/user.model';
import { UserStatusType } from '../types/user-status.type';
import { HttpErrorService } from './http-error.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  token$ = new BehaviorSubject<string>(undefined);
  user$ = new BehaviorSubject<User>(undefined);

  private baseUrl = 'api-rest-auth/';

  get token(): string {
    return this.token$.getValue();
  }

  set token(token: string) {
    if (token) {
      this.storage.set('intersurv_token', token);
      this.token$.next(token);
      this.getUser().subscribe((user) => {
        this.lastLoggedUserStatus = user.status;
      });
    } else {
      this.storage.remove('intersurv_token');
      this.token$.next(null);
      this.user$.next(null);
    }
  }

  get lastLoggedUserStatus(): UserStatusType {
    return this.storage.get('intersurv_lastLoggedUserStatus');
  }

  set lastLoggedUserStatus(status: UserStatusType) {
    this.storage.set('intersurv_lastLoggedUserStatus', status);
  }

  constructor(
    private http: HttpClient,
    private storage: LocalStorageService,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private httpError: HttpErrorService,
  ) {
    const token = this.storage.get('intersurv_token');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.token = token;
    } else {
      this.token = null;
    }
  }

  signIn(data: SignInData): Observable<AuthResponse> {
    return this.http.post(this.getFullUrl('login'), data)
      .pipe(
        retryWhen(this.httpError.genericRetryStrategy({ excludedStatusCodes: [400] })),
        tap((response: AuthResponse) => this.onAuth(response)),
      );
  }

  signUp(data: SignUpData, skipSignIn = false): Observable<AuthResponse> {
    return this.http.post(this.getFullUrl('registration'), data)
      .pipe(
        retryWhen(this.httpError.genericRetryStrategy({ excludedStatusCodes: [400] })),
        tap((response: AuthResponse) => this.onAuth(response, skipSignIn)),
      );
  }

  signOut(): Observable<any> {
    return this.http.post(this.getFullUrl('logout'), null)
      .pipe(
        tap(() => this.onSignOut()),
      );
  }

  getUser(): Observable<User> {
    const url = this.getFullUrl('user');

    return this.http.get(url)
      .pipe(
        retryWhen(this.httpError.genericRetryStrategy()),
        map((user: UserResponse) => new User(user)),
        tap((user: User) => {
          this.user$.next(user);
        }),
      );
  }

  private getFullUrl(endpoint: string): string {
    if (!endpoint.endsWith('/')) {
      endpoint += '/';
    }

    return environment.hostUrl + this.baseUrl + endpoint;
  }

  private onAuth(response: AuthResponse, skipSignIn = false) {
    if (response.token) {
      if (!skipSignIn) {
        this.token = response.token;
      }
    } else {
      this.onSignOut();
    }
  }

  private onSignOut() {
    this.token = null;
    this.router.navigateByUrl('/');
  }

}
