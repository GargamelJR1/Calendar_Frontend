import { Component, HostListener, Input, } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { CommonModule } from '@angular/common';
import { Task } from '../models/task'
import { Day } from '../models/day';
import { ThemeService } from '../services/theme.service';
import { AddEventComponent } from '../add-event/add-event.component';
import { TaskService } from '../services/task.service';
import { Event } from '../models/event';
import { EventService } from '../services/event.service';
import { EventComponent } from '../event/event.component';

@Component({
  selector: 'app-day',
  standalone: true,
  imports: [
    TaskComponent,
    CommonModule,
    AddEventComponent,
    EventComponent
  ],
  templateUrl: './day.component.html',
  styleUrl: './day.component.css'
})
export class DayComponent {
  @Input() day!: Day;
  events?: Event[];
  tasks?: Task[];
  @Input() isInViewedMonth?: boolean;
  status: boolean = false;
  state: string = 'visible';
  isHovering: boolean = false;
  currentTask?: Task;
  currentEvent?: Event;
  showAddEvent: boolean = false;

  constructor(public themeService: ThemeService, private taskService: TaskService, private eventService: EventService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks.filter(task => {
        const taskDeadline = new Date(task.deadline.setHours(0, 0, 0, 0));
        const dayDate = new Date(this.day.date.setHours(0, 0, 0, 0));
        return taskDeadline.getTime() === dayDate.getTime();
      });
      // console.log(this.tasks);
    });

    this.eventService.getEvents().subscribe(events => {
      this.events = events.filter(event => {
        const eventStartDate = new Date(event.startDate).setHours(0, 0, 0, 0);
        const eventEndDate = new Date(event.endDate).setHours(0, 0, 0, 0);
        const dayDate = new Date(this.day.date).setHours(0, 0, 0, 0);
        return dayDate >= eventStartDate && dayDate <= eventEndDate;
      });
    });
  }

  showTask() {
    if (this.currentTask || this.currentEvent) {
      this.status = !this.status;
      if (this.status) {
        this.state = 'visible';
      }
      else {
        this.currentEvent = undefined;
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

  setCurrentEvent(event: Event) {
    this.currentEvent = event;
  }

  isLightColor(color: string): boolean {
    // Assuming color is in hex format (e.g., #ffffff)
    if (color === undefined || color === null) return false;
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    // Using the luminance formula to calculate brightness
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
  }
}

