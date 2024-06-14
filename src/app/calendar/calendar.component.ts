import { Component } from '@angular/core';
import { GridComponent } from '../grid/grid.component';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    GridComponent, 
    MatButtonModule, 
    MatDividerModule, 
    MatIconModule
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  
  
  year:number = 2024;
  month: number = 0;
  
  incMonth()
  {
    if(this.month==11)
      {
        this.year++;
        this.month=0;
      }
      else{
        this.month++;

      }
  }

  getMonth()
  {
    switch(this.month)
    {
      case 0:
        return 'January';
      case 1:
        return 'February';
      case 2:
        return 'March';
      case 3:
        return 'April';
      case 4:
        return 'May';
      case 5:
        return 'June';
      case 6:
        return 'July';
      case 7:
        return 'August';
      case 8:
        return 'September';
      case 9:
        return 'Oktober';
      case 10:
        return 'November';
      case 11:
        return 'December';
      default:
        return '';

    }

  }
}
