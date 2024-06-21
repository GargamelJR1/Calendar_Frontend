import { Component, Input } from '@angular/core';
import { TaskService } from '../services/task.service';
import { ThemeService } from '../services/theme.service';
import { Task } from '../models/task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-month-task-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './month-task-list.component.html',
  styleUrl: './month-task-list.component.css'
})
export class MonthTaskListComponent {
  @Input() firstDayOfMonth: Date = new Date();
  tasksCurrentMonth: Task[] = [];

  constructor(private taskService: TaskService, public themeService: ThemeService) { }

  ngOnInit() {
    this.tasksCurrentMonth = this.taskService.getTasksByDates(
      this.firstDayOfMonth, new Date(this.firstDayOfMonth.getFullYear(), this.firstDayOfMonth.getMonth() + 1, 0)
    );
  }
}
