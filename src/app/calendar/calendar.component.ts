import { Component } from '@angular/core';
import { GridComponent } from '../grid/grid.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    GridComponent
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {

}
