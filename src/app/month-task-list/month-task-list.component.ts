import { Component, Input } from '@angular/core';
import { TaskService } from '../services/task.service';
import { ThemeService } from '../services/theme.service';
import { Task } from '../models/task';
import { CommonModule } from '@angular/common';
import { TaskBriefComponent } from '../task-brief/task-brief.component';
import { Subscription } from 'rxjs';

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
  private subscription: Subscription = new Subscription();

  constructor(private taskService: TaskService, public themeService: ThemeService) { }

  ngOnInit() {
    this.loadTasks();
  }

  refresh() {
    this.loadTasks();
  }

  loadTasks() {
    const month = this.month ?? new Date().getMonth();
    this.subscription.add(this.taskService.getTasksByDates(
      new Date(new Date().getFullYear(), month, 1),
      new Date(new Date().getFullYear(), month + 1, 0)
    ).subscribe(tasks => {
      this.tasksCurrentMonth = tasks;
    }));
  }
}
