import { Component, Input, SimpleChanges } from '@angular/core';
import { Task } from '../models/task';
import { Event } from '../models/event';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task.service';
import { EventService } from '../services/event.service';
import { ThemeService } from '../services/theme.service';
import { TaskComponent } from '../task/task.component';
import { EventComponent } from '../event/event.component';

@Component({
  selector: 'app-searched-list',
  standalone: true,
  imports: [
    CommonModule,
    TaskComponent,
    EventComponent
  ],
  templateUrl: './searched-list.component.html',
  styleUrl: './searched-list.component.css'
})
export class SearchedListComponent {
  @Input() searchTag: string = '';

  tasks: Task[] = [];
  events: Event[] = [];

  constructor(private taskService: TaskService, private eventService: EventService, public themeService: ThemeService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchTag']) {
      this.getTasksAndEvents();
    }
  }

  getTasksAndEvents() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks.filter(task => task.tags?.includes(this.searchTag));
    });
    this.eventService.getEvents().subscribe((events) => {
      this.events = events.filter(event => event.tags?.includes(this.searchTag));
    });
  }
}
