import { Component, Inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-calendar-header',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './calendar-header.component.html',
  styleUrl: './calendar-header.component.css'
})
export class CalendarHeaderComponent {
  constructor(@Inject(AuthService) public authService: AuthService, @Inject(ThemeService) public themeService: ThemeService) { }

  logout() {
    this.authService.logout().subscribe((resp) => { });
    window.location.reload();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  toogleTheme() {
    this.themeService.toogleTheme();
  }
}
