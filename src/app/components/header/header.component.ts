import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

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
export class HeaderComponent {
  @Output() toggleDrawer = new EventEmitter();

  onToggleDrawer() {
    this.toggleDrawer.emit();
  }
}
