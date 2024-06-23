import { Component, Input } from '@angular/core';
import { TaskService } from '../services/task.service';
import { ThemeService } from '../services/theme.service';
import { Task } from '../models/task';
import { CommonModule } from '@angular/common';
import { TaskBriefComponent } from '../task-brief/task-brief.component';

@Component({
  selector: 'app-month-task-list',
  standalone: true,
  imports: [
    CommonModule,
    TaskBriefComponent
  ],
  templateUrl: './month-task-list.component.html',
  styleUrl: './month-task-list.component.css'
})
export class MonthTaskListComponent {
  @Input() month?: number;
  tasksCurrentMonth: Task[] = [];

  constructor(private taskService: TaskService, public themeService: ThemeService) { }

  ngOnInit() {
    const month = this.month ?? new Date().getMonth();
  this.tasksCurrentMonth = this.taskService.getTasksByDates(
    new Date(new Date().getFullYear(), month, 1),
    new Date(new Date().getFullYear(), month + 1, 0)
  );
  }

  refresh() {
    const month = this.month ?? new Date().getMonth();
    this.tasksCurrentMonth = this.taskService.getTasksByDates(
      new Date(new Date().getFullYear(), month, 1),
      new Date(new Date().getFullYear(), month + 1, 0)
    );
  }
}
