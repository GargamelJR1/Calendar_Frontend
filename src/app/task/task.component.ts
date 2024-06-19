import { Component } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  task: Task = {
    id: 1,
    name: 'Test Title',
    description: 'Test description',
    tags: [],
    priority: 'high',
    complated: false,
    deadline: new Date(2024, 1, 1, 12, 0),
    completeDate: new Date(2024, 1, 2, 12, 0),
    createdAt: new Date(Date.now()),
    master: 0
  }

  getPriority() {

  }
}
