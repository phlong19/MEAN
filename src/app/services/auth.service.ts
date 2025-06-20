import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Subject } from 'rxjs';
import { User } from '../app.model';
import { MatDialog } from '@angular/material/dialog';
import { TimeoutDialogComponent } from '../components/ui/timeout-dialog/timeout-dialog.component';

@Injectable({ providedIn: 'root' })
export default class AuthService {
  private api = 'http://localhost:10000/api';
  private token: string;
  private isAuthenticated = false;
  private tokenTimer: NodeJS.Timeout;
  private user = new Subject<User>();
  private userId: string;
  readonly dialog = inject(MatDialog);

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getUserListener() {
    return this.user.asObservable();
  }

  createUser(username: string, email: string, password: string) {
    const user = { username, email, password };

    return this.http.post<{ message: string }>(`${this.api}/user/signup`, user);
  }

  autoAuthUser() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    const user = localStorage.getItem('user');

    if (!expiration || !token || !user) {
      return;
    }

    const expireAt = new Date(expiration);
    const now = new Date();
    const timeLeft = expireAt.getTime() - now.getTime();

    if (timeLeft > 0) {
      this.token = token;
      this.isAuthenticated = true;
      this.setSessionTimer(timeLeft);
      const parsedUser = JSON.parse(user);
      this.user.next(parsedUser);
      this.userId = parsedUser?._id;
    } else {
      this.logout();
    }
  }

  login(email: string, password: string) {
    return this.http
      .post<{ expire: number; token: string; user: User; message: string }>(
        `${this.api}/user/login`,
        { email, password }
      )
      .pipe(
        map((res) => {
          if (res.token) {
            const expire = res.expire * 60 * 1000;
            const expirationDate = new Date(new Date().getTime() + expire);

            this.setSessionTimer(expire, res.user.username);
            this.isAuthenticated = true;
            this.user.next({ ...res.user });
            this.userId = res.user._id!;
            localStorage.setItem('token', res.token);
            localStorage.setItem('expiration', expirationDate.toISOString());
            localStorage.setItem('user', JSON.stringify(res.user));

            this.router.navigate(['/']);
          }
          return res.message;
        })
      );
  }

  logout() {
    this.token = '';
    this.isAuthenticated = false;
    if (this.tokenTimer) {
      clearTimeout(this.tokenTimer);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('user');

    this.user.next({});
  }

  private setSessionTimer(duration: number, name?: string) {
    this.tokenTimer = setTimeout(() => {
      this.dialog.open(TimeoutDialogComponent, { data: name });
      this.logout();
    }, duration);
  }
}
