import { Component, Input } from '@angular/core';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../services/theme.service';
import { TaskBriefComponent } from '../task-brief/task-brief.component';

@Component({
  selector: 'app-weeks-task-list',
  standalone: true,
  imports: [
    CommonModule,
    TaskBriefComponent
  ],
  templateUrl: './weeks-task-list.component.html',
  styleUrl: './weeks-task-list.component.css'
})
export class WeeksTaskListComponent {
  tasksCurrentWeek: Task[] = [];
  tasksNextWeek: Task[] = [];
  tasksTwoWeeksFromNow: Task[] = [];
  currentDate: Date = new Date();

  constructor(private taskService: TaskService, public themeService: ThemeService) { }

  ngOnInit() {
    // Adjust the start of the week to Monday
    const currentDayOfWeek = this.currentDate.getDay();
    const daysToSubtract = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
    const startOfWeek = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() - daysToSubtract);
    const week = 1000 * 60 * 60 * 24 * 7;

    // Subscribe to tasks for the current week
    this.taskService.getTasksByDates(startOfWeek, new Date(startOfWeek.getTime() + week))
      .subscribe(tasks => {
        this.tasksCurrentWeek = tasks;
      });

    // Subscribe to tasks for the next week
    this.taskService.getTasksByDates(new Date(startOfWeek.getTime() + week), new Date(startOfWeek.getTime() + week * 2))
      .subscribe(tasks => {
        this.tasksNextWeek = tasks;
      });

    // Subscribe to tasks for two weeks from now
    this.taskService.getTasksByDates(new Date(startOfWeek.getTime() + week * 2), new Date(startOfWeek.getTime() + week * 3))
      .subscribe(tasks => {
        this.tasksTwoWeeksFromNow = tasks;
      });
  }
}
