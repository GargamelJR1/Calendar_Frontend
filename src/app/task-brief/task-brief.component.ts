import { Component, Input } from '@angular/core';
import { Task } from '../models/task';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-brief',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './task-brief.component.html',
  styleUrl: './task-brief.component.css'
})
export class TaskBriefComponent {
  @Input() task?: Task;

  constructor(private taskService: TaskService) { }

  completeTask(task: Task) {
    this.taskService.setTaskCompletionStatus(task.id, task.completed);
  }
}
