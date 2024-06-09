import { Component, Input } from '@angular/core';
import { DayComponent } from '../day/day.component';


@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [DayComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent {
  @Input() year!: number;
  @Input() monthNumber!: number;

  firstOfMonth: Date = new Date();
  lastOfMonth: Date =  new Date();

  
  month: Date [][] = [];
  
  constructor(){}
  
  weeks: number = 0;
  
  getNumberOfWeeks() {
    this.firstOfMonth = new Date(this.year, this.monthNumber, 1);
    let startDay = this.firstOfMonth.getDay();

    //Adjust so monday is the first day os the week
    startDay = (startDay === 0) ? 6 : startDay - 1;

    const daysInMonth = new Date(this.year, this.monthNumber + 1, 0).getDate();

    const totalDays = startDay + daysInMonth;

    let weeks = Math.ceil(totalDays / 7);
    
    this.weeks = weeks;
    return weeks;
  }

  calculateOffset()
  {
    let offset = 0;
    const firstDay = this.firstOfMonth.getDay();
    if(firstDay > 1)
      {
        offset = firstDay - 1;
      }
    //special case for sunday
    if(firstDay == 0)
      {
        offset = 6;
      }
      return offset;
  }

  fillMonth()
  {
    let week: Date[] = [];
    const startingOffset = this.calculateOffset();
    for(let i:number = startingOffset; i > 0 ; i-- )
      {
        week[i] = new Date(this.year, this.monthNumber, i*(-1));
      }

  }

}
