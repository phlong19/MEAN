import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../app.model';

@Injectable({ providedIn: 'root' })
export default class AuthService {
  private api = 'http://localhost:10000/api';
  private token: string;
  private isAuthenticated = false;
  private user = new Subject<User>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getUserListener() {
    return this.user.asObservable();
  }

  createUser(username: string, email: string, password: string) {
    const user = { username, email, password };

    this.http.post(`${this.api}/user/signup`, user).subscribe((res) => {
      this.router.navigate(['/login']);
    });
  }

  login(email: string, password: string) {
    this.http
      .post<{ token: string; user: User }>(`${this.api}/user/login`, {
        email,
        password,
      })
      .subscribe((res) => {
        this.token = res.token;
        if (res.token) {
          this.isAuthenticated = true;
          this.user.next({ ...res.user });
          this.router.navigate(['/']);
        }
      });
  }

  logout() {
    this.token = '';
    this.isAuthenticated = false;
    this.user.next({});
  }
}
