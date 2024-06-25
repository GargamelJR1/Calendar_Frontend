import { Component, Input } from '@angular/core';
import { Task } from '../models/task';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    CommonModule,
    AddTaskComponent
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input() task?: Task;
  // showAddTask: boolean = false;

  ngOnInit(): void {
    console.log(this.task);
  }
}
