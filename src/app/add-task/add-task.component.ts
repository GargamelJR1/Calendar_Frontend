import { Component, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../models/task';
import { FormsModule } from '@angular/forms';
import { Modal } from 'bootstrap';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  @Input() date?: Date;
  @Output() modalClosed = new EventEmitter<void>();

  currentMonthTasks: Task[] = [];

  newTask: Task = {
    id: 0,
    name: '',
    description: '',
    tags: [],
    priority: 'Low',
    completed: false,
    deadline: new Date(),
    completeDate: undefined,
    createdAt: new Date(),
    master: undefined
  };

  constructor(private el: ElementRef, private tasksService: TaskService) { }

  ngOnInit(): void {
    this.tasksService.getTasks().subscribe(tasks => {
      this.currentMonthTasks = tasks.filter(task => task.deadline.getMonth() === this.date?.getMonth());
    });
  }

  ngAfterViewInit(): void {
    this.showModal();
  }

  showModal(): void {
    const modalElement = this.el.nativeElement.querySelector('#addTaskModal');
    const modal = new Modal(modalElement);
    modal.show();

    modalElement.addEventListener('hidden.bs.modal', () => {
      this.modalClosed.emit();
    });
  }

}
