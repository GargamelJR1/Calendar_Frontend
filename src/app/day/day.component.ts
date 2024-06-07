import { Component, Input, } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { CommonModule } from '@angular/common';
import { Task } from '../task'


@Component({
  selector: 'app-day',
  standalone: true,
  imports: [TaskComponent, CommonModule],
  templateUrl: './day.component.html',
  styleUrl: './day.component.css'
})
export class DayComponent {
  @Input() day!: number;
  status: boolean = false;
  state: string = 'viseable';
  tasks: Task[] = [];

  constructor() {}

  activateTaks() {
    this.status = !this.status;
    if(this.status)
    {
      this.state = 'visable';
    }
    else
    {
     this.state = "inviable"; 
    }
    this.day += 1;
  }
}
