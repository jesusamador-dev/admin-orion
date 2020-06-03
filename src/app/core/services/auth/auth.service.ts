import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user/user.model';
import { tap } from 'rxjs/operators';
import * as Cookies from 'js-cookie';

const apiUrl = environment.api;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<User>(`${apiUrl}auth/login`, {
      email,
      password
    })
      .pipe(
        tap(res => this.setSession(res))
      );
  }

  private setSession(authResult) {
    Cookies.set('token', authResult.token);
    localStorage.setItem('user', JSON.stringify(authResult.user));
  }

  get isLoggedIn(): boolean {
    return (Cookies.get('token') !== undefined);
  }

  logOut() {
    Cookies.remove('token');
    localStorage.removeItem('user');
    return true;
  }

  get user(): string {
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    return user;
  }

}
