import { Component } from '@angular/core';
import { DayComponent } from '../day/day.component';


@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [DayComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent {

}
