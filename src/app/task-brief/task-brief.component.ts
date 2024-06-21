import { Component, Input } from '@angular/core';
import { Task } from '../models/task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-brief',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './task-brief.component.html',
  styleUrl: './task-brief.component.css'
})
export class TaskBriefComponent {
  @Input() task?: Task;
}
