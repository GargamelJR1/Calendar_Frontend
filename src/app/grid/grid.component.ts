import { Component, Input, ChangeDetectorRef, SimpleChanges, OnChanges } from '@angular/core';
import { DayComponent } from '../day/day.component';
import { CommonModule, NgFor } from '@angular/common';
import { Day } from '../models/day';
import { Task } from '../models/task';


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
export class GridComponent implements OnChanges {
  @Input() year!: number;
  @Input() monthNumber!: number;

  firstOfMonth: Date = new Date();
  lastOfMonth: Date = new Date();

  month: Day[][];

  constructor(private changeDetection: ChangeDetectorRef) {
    this.month = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['year'] || changes['monthNumber']) {
      this.firstOfMonth = new Date(this.year, this.monthNumber, 1); // Poprawka: miesiące w JS są zero-indeksowane
      this.fillMonth();
    }
  }

  ngOnInit() {
    this.firstOfMonth = new Date(this.year, this.monthNumber, 1);
    this.fillMonth();

  }

  weeks: number = 0;

  getNumberOfWeeks(): number {
    const firstDayOfMonth = new Date(this.year, this.monthNumber, 1);
    const lastDayOfMonth = new Date(this.year, this.monthNumber + 1, 0);
    
    // Calculate the number of days in the month
    const daysInMonth = lastDayOfMonth.getDate();
    
    // Calculate the day of the week for the first and last day of the month
    const firstDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7;
    const lastDayOfWeek = (lastDayOfMonth.getDay() + 6) % 7;
    
    // Calculate the number of weeks
    return Math.ceil((daysInMonth + firstDayOfWeek + (6 - lastDayOfWeek)) / 7);
  }
  
  calculateOffset(): number {
    const firstDayOfMonth = new Date(this.year, this.monthNumber, 1);
    return (firstDayOfMonth.getDay() + 6) % 7;
  }

  isInViewedMonth(day: Date): boolean {
    return day.getMonth() === this.monthNumber && day.getFullYear() === this.year;
  }

  fillMonth() {
    this.month = []; // Clear the month array
    const startingOffset = this.calculateOffset();
    const weeksNo = this.getNumberOfWeeks();
    for (let i: number = 0; i < weeksNo; i++) {
      let week: Day[] = [];
      for (let j: number = 0; j < 7; j++) {
        let tmpDate = new Date(this.year, this.monthNumber, (i * 7) + j + 1 - startingOffset);
        week.push({
          day: tmpDate.getDate(),
          date: tmpDate
        });
      }
      // If it's the last week and the length is less than 7, add days from the next month
      if (i === weeksNo - 1) {
        while (week.length < 7) {
          let nextDay = new Date(week[week.length - 1].date);
          nextDay.setDate(nextDay.getDate() + 1);
          week.push({
            day: nextDay.getDate(),
            date: nextDay
          });
        }
      }
      this.month[i] = week;
    }
  }


  tasks: Task[] = [
    {
      id: 1,
      name: "Test task1",
      description: "This is the test taks no1",
      tags: undefined,
      priority: "high",
      completed: false,
      deadline: new Date(),
      completeDate: undefined,
      createdAt: undefined,
      master: undefined
    },
    {
      id: 2,
      name: "Test task1",
      description: "This is the test taks no2",
      priority: "high",
      completed: false,
      deadline: new Date()
    }, {
      id: 3,
      name: "Test task1",
      description: "This is the test taks no3",
      priority: "high",
      completed: false,
      deadline: new Date()
    }, {
      id: 4,
      name: "Test task1",
      description: "This is the test taks no4",
      priority: "high",
      completed: false,
      deadline: new Date()
    }, {
      id: 5,
      name: "Test task1",
      description: "This is the test taks no5",
      priority: "high",
      completed: false,
      deadline: new Date()
    }
  ];

}
