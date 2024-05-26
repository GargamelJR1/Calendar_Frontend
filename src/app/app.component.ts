import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { CalendarComponent } from './calendar/calendar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CalendarHeaderComponent,
    CalendarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Calendar_Frontend';
}
