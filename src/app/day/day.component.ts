import { Component, HostListener, Input, } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { CommonModule } from '@angular/common';
import { Task } from '../models/task'
import { Day } from '../models/day';
import { ThemeService } from '../services/theme.service';
import { AddTaskComponent } from '../add-task/add-task.component';



@Component({
  selector: 'app-day',
  standalone: true,
  imports: [
    TaskComponent, 
    CommonModule,
    AddTaskComponent
  ],
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
  showAddTask: boolean = false;

  constructor(public themeService: ThemeService) { }

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

  showAddTaskModal() {
    this.showAddTask = false;
    this.showAddTask = true;
  }
}

