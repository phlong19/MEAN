import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
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
  readonly dialog = inject(MatDialog);

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
      .post<{ expire: number; token: string; user: User }>(
        `${this.api}/user/login`,
        {
          email,
          password,
        }
      )
      .subscribe((res) => {
        this.token = res.token;
        if (res.token) {
          const name = res.user?.username;
          this.tokenTimer = setTimeout(() => {
            this.dialog.open(TimeoutDialogComponent, { data: { name } });
            this.logout();
          }, res.expire * 60 * 1000); // 5 mins
          this.isAuthenticated = true;
          this.user.next({ ...res.user });
          this.router.navigate(['/']);
        }
      });
  }

  logout() {
    this.token = '';
    this.isAuthenticated = false;
    if (this.tokenTimer) {
      clearTimeout(this.tokenTimer);
    }
    this.user.next({});
  }
}
