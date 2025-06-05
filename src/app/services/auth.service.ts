import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export default class AuthService {
  private api = 'http://localhost:10000/api';

  constructor(private http: HttpClient) {}

  createUser(username: string, email: string, password: string) {
    const user = { username, email, password };

    this.http.post(`${this.api}/user/signup`, user).subscribe((res) => {
      console.log(res);
    });
  }

  login(email: string, password: string) {
    this.http
      .post(`${this.api}/user/login`, { email, password })
      .subscribe((res) => {
        console.log(res);
      });
  }
}
