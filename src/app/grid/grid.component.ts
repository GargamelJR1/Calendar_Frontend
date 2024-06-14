import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { DayComponent } from '../day/day.component';
import { CommonModule, NgFor } from '@angular/common';
import { Day } from '../day';


@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [DayComponent,
    CommonModule,
    NgFor
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent {
  @Input() year!: number;
  @Input() monthNumber!: number;

  firstOfMonth: Date = new Date();
  lastOfMonth: Date =  new Date();

  month: Day [][];
  
  constructor(private changeDetection: ChangeDetectorRef){
    this.month = [];
  }
  
  ngOnInit() {
    this.firstOfMonth = new Date(this.year, this.monthNumber, 1);
    this.fillMonth();

  }
  
  weeks: number = 0;
  
  getNumberOfWeeks() {
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
    let offset:number = 0;
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
      console.log(offset);
      //QUICK FIX this will bite your ass
      return offset-1;
  }

  fillMonth()
  {
    const startingOffset = this.calculateOffset();
    const weeksNo = this.getNumberOfWeeks();
    for(let i:number = 0; i < weeksNo ; i++ )
      {
        let week: Day [] = [];
        for(let j:number = 0; j < 7; j++)
          {
            let tmpDate = new Date(this.year, this.monthNumber,
              (i * 7) + j - startingOffset);
            week.push({
              day: tmpDate.getDate(),
              date: tmpDate
            });
            }
        this.month[i] = week;
      }
    // for(let i = 0; i < weeksNo * 7; i++)
    //   {
    //     let tmpDate = new Date(this.year, this.monthNumber,
    //                 i - startingOffset);
    //               this.month3.push({
    //                 day: tmpDate.getDate(),
    //                 date: tmpDate});
    //   }
      // this.changeDetection.detectChanges();
  }


  month2: Day[][] = [
    [{
      day: 28,
      date: new Date(this.year, this.monthNumber, -3)
    },
    {
      day: 29,
      date: new Date(this.year, this.monthNumber, -2)
    },
    {
      day: 30,
      date: new Date(this.year, this.monthNumber, -1)
    },
    {
      day: 1,
      date: new Date(this.year, this.monthNumber, 0)
    },
    {
      day: 2,
      date: new Date(this.year, this.monthNumber, 1)
    },
    {
      day: 3,
      date: new Date(this.year, this.monthNumber, 2)
    },
    {
      day: 4,
      date: new Date(this.year, this.monthNumber, 3)
    }],
    [{
      day: 28,
      date: new Date(this.year, this.monthNumber, -3)
    },
    {
      day: 29,
      date: new Date(this.year, this.monthNumber, -2)
    },
    {
      day: 30,
      date: new Date(this.year, this.monthNumber, -1)
    },
    {
      day: 1,
      date: new Date(this.year, this.monthNumber, 0)
    },
    {
      day: 2,
      date: new Date(this.year, this.monthNumber, 1)
    },
    {
      day: 3,
      date: new Date(this.year, this.monthNumber, 2)
    },
    {
      day: 4,
      date: new Date(this.year, this.monthNumber, 3)
    }],
  ]

}
