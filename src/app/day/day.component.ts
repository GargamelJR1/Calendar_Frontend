import { Component, HostListener, Input, } from '@angular/core';
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
  @Input() isInViewedMonth?: boolean;
  status: boolean = false;
  state: string = 'visible';
  isHovering: boolean = false;
  currentTask?: Task;

  constructor() { }

  activateTask() {
    if (this.currentTask) {
      this.status = !this.status;
      if (this.status) {
        this.state = 'visible';
      }
      else {
        this.currentTask = undefined;
        this.state = "invisible";
      }
    }
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.isHovering = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.isHovering = false;
  }

  setCurrentTask(task: Task) {
    this.currentTask = task;
  }
}

