import { Component, Inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

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
  constructor(@Inject(AuthService) public authService: AuthService) { }

  logout() {
    this.authService.logout().subscribe((resp) => { });
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
