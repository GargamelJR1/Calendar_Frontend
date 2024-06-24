import { Component, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../models/task';
import { FormsModule } from '@angular/forms';
import { Modal } from 'bootstrap';
import { TaskService } from '../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  @Output() modalClosed = new EventEmitter<void>();
  @Input() master?: number;
  @Input() showAddMasterOption?: boolean;
  deadline?: Date;
  tagsString: string = '';

  tasksToSelect: Task[] = [];

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
    master: this.master
  };

  constructor(private el: ElementRef, private tasksService: TaskService) { }

  ngOnInit(): void {
    this.tasksService.getTasks().subscribe(tasks => {
      this.tasksToSelect = tasks;
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

  processTags(value: string): void {
    this.newTask.tags = value.split(',').map(tag => tag.trim());
  }

  onSubmit(): void {
    console.log(this.newTask);
    this.tasksService.addTask(this.newTask)
  }

  get formattedDeadline(): string {
    return this.formatDateToDateTimeLocal(this.newTask.deadline);
  }

  set formattedDeadline(value: string) {
    this.newTask.deadline = new Date(value);
  }

  formatDateToDateTimeLocal(date: Date): string {
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
    return adjustedDate.toISOString().slice(0, 16);
  }
}
