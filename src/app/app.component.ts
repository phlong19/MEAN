import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { CustomRoute } from './app.model';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import AuthService from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    HeaderComponent,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    NgFor,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'social-media';

  routes: CustomRoute[] = [
    { href: '', label: 'home' },
    { href: 'create', label: 'new post' },
  ];

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.autoAuthUser();
  }
}
