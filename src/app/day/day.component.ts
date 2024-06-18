import { Component, Input, } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { CommonModule, NgFor } from '@angular/common';
import { Task } from '../task'
import { Day } from '../day';



@Component({
  selector: 'app-day',
  standalone: true,
  imports: [TaskComponent, CommonModule, NgFor],
  templateUrl: './day.component.html',
  styleUrl: './day.component.css'
})
export class DayComponent {
  @Input() day!: Day;
  @Input() tasks?: Task[];
  status: boolean = false;
  state: string = 'viseable';
  
  
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
  }

}

