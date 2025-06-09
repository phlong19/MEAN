import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import AuthService from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../app.model';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggleDrawer = new EventEmitter();
  private authListener: Subscription;
  isAuthenticated = false;
  user: User;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authListener = this.authService.getUserListener().subscribe((res) => {
      this.isAuthenticated = !!res?._id;
      this.user = { ...res };
    });
  }

  onToggleDrawer() {
    this.toggleDrawer.emit();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authListener.unsubscribe();
  }
}
