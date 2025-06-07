import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export default class AuthService {
  private api = 'http://localhost:10000/api';
  private token: string;

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  createUser(username: string, email: string, password: string) {
    const user = { username, email, password };

    this.http.post(`${this.api}/user/signup`, user).subscribe((res) => {
      this.router.navigate(['/login']);
    });
  }

  login(email: string, password: string) {
    this.http
      .post<{ token: string }>(`${this.api}/user/login`, { email, password })
      .subscribe((res) => {
        this.token = res.token;
        this.router.navigate(['/']);
      });
  }
}
