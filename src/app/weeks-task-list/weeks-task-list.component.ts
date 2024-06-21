import { Component, Input } from '@angular/core';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-weeks-task-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './weeks-task-list.component.html',
  styleUrl: './weeks-task-list.component.css'
})
export class WeeksTaskListComponent {
  tasksCurrentWeek: Task[] = [];
  tasksNextWeek: Task[] = [];
  tasksTwoWeeksFromNow: Task[] = [];
  @Input() currentDate: Date = new Date();

  constructor(private taskService: TaskService, public themeService: ThemeService) { }

  ngOnInit() {
  // Calculate the first day of the current week, considering Monday as the first day
  const dayOfWeek = this.currentDate.getDay();
  const startOfWeek = new Date(this.currentDate);
  startOfWeek.setDate(this.currentDate.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  startOfWeek.setHours(0, 0, 0, 0); // Reset hours for consistent comparison

  // Current week tasks
  this.tasksCurrentWeek = this.taskService.getTasksByDates(
    new Date(startOfWeek.getTime()), 
    new Date(startOfWeek.getTime() + 7 * 24 * 60 * 60 * 1000)
  );

  // Next week tasks
  this.tasksNextWeek = this.taskService.getTasksByDates(
    new Date(startOfWeek.getTime() + 7 * 24 * 60 * 60 * 1000), 
    new Date(startOfWeek.getTime() + 14 * 24 * 60 * 60 * 1000)
  );

  // Two weeks from now tasks
  this.tasksTwoWeeksFromNow = this.taskService.getTasksByDates(
    new Date(startOfWeek.getTime() + 14 * 24 * 60 * 60 * 1000), 
    new Date(startOfWeek.getTime() + 21 * 24 * 60 * 60 * 1000)
  );
  }

}
