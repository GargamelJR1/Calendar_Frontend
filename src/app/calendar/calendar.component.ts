import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { GridComponent } from '../grid/grid.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeeksTaskListComponent } from '../weeks-task-list/weeks-task-list.component';
import { MonthTaskListComponent } from '../month-task-list/month-task-list.component';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TaskService } from '../services/task.service';
import { EventService } from '../services/event.service';
import { SearchedListComponent } from '../searched-list/searched-list.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    GridComponent,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    WeeksTaskListComponent,
    MonthTaskListComponent,
    AddTaskComponent,
    SearchedListComponent
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  @ViewChild('monthTaskList') monthTaskListComponent!: MonthTaskListComponent;
  selectedOption: string = 'nextWeeks';
  showAddTask: boolean = false;
  searchQuery: string = '';
  toasts: any[] = [];

  year: number = new Date().getFullYear();
  month: number = new Date().getMonth();

  constructor(private taskService: TaskService, private eventService: EventService) { }

  fetchTasksAndEvents() {
    this.taskService.fetchTasks();
    this.eventService.fetchEvents();
  }

  incMonth() {
    if (this.month == 11) {
      this.year++;
      this.month = 0;
    }
    else {
      this.month++;

    }
    // this.cdr.detectChanges();
    this.fetchTasksAndEvents();
    this.updateMonthInChildComponent();
  }

  decMonth() {
    if (this.month == 0) {
      this.year--;
      this.month = 11;
    }
    else {
      this.month--;

    }
    // this.cdr.detectChanges();
    this.fetchTasksAndEvents();
    this.updateMonthInChildComponent();
  }

  updateMonthInChildComponent() {
    if (this.monthTaskListComponent) {
      this.monthTaskListComponent.month = this.month;
      this.monthTaskListComponent.refresh();
    }
  }

  ngOnInit() {
    this.fetchTasksAndEvents();

    this.toasts = [];
    this.taskService.getTasks().subscribe(tasks => {
      for (let task of tasks) {
        if (task.deadline >= new Date() && task.deadline <= new Date(new Date().setDate(new Date().getDate() + 3))) {
          const newToast = {
            header: 'Task Deadline',
            body: task.name + ' is due on ' + task.deadline.toDateString() + '.',
            show: true
          };
          this.toasts.push(newToast);

          // Automatically hide the toast after 5 seconds
          setTimeout(() => {
            this.hideToast(newToast);
          }, 3000);
        }
      }
    });
  }

  getMonth() {
    switch (this.month) {
      case 0:
        return 'January';
      case 1:
        return 'February';
      case 2:
        return 'March';
      case 3:
        return 'April';
      case 4:
        return 'May';
      case 5:
        return 'June';
      case 6:
        return 'July';
      case 7:
        return 'August';
      case 8:
        return 'September';
      case 9:
        return 'October';
      case 10:
        return 'November';
      case 11:
        return 'December';
      default:
        return '';
    }
  }

  hideToast(toast: any) {
    toast.show = false;
  }
}
