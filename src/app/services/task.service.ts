import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task, TaskDTO } from '../models/task';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TimeSpan } from '../models/timespan';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _tasks: Task[] = [];
  tasks = new BehaviorSubject<Task[]>(this._tasks);

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.tasks.asObservable();
  }

  fetchTasks() {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const email = localStorage.getItem('email');
    this.http.get<Task[]>(`/api/task/user/${email}`, { headers }).subscribe((tasks: any[]) => {
      this._tasks = tasks.map(task => ({
        ...task,
        completed: task.completed,
        deadline: new Date(task.deadline),
        completeDate: task.completedAt ? new Date(task.completedAt) : undefined,
        createdAt: task.createdAt ? new Date(task.createdAt) : undefined,
        tags: task.tags.map((tag: { name: string }) => tag.name)
      }));
      this.tasks.next(this._tasks);
    });
  }

  // fetchTasksFromThreeMonths(timeSpan: TimeSpan) {
  //   const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  //   this.http.post<Task[]>('/api/task/fromThreeMonths', timeSpan, { headers }).subscribe((tasks: any[]) => {
  //     this._tasks = tasks.map(task => ({
  //       ...task,
  //       deadline: new Date(task.deadline),
  //       completeDate: task.completedAt ? new Date(task.completedAt) : undefined,
  //       createdAt: task.createdAt ? new Date(task.createdAt) : undefined,
  //       tags: task.tags.map((tag: { name: string }) => tag.name)
  //     }));
  //     this.tasks.next(this._tasks);
  //   });
  // }

  getTasksByDates(startDate: Date, endDate: Date): Observable<Task[]> {
    return this.tasks.pipe(
      map(tasks => tasks.filter(task => task.deadline >= startDate && task.deadline <= endDate))
    );
  }

  addTask(task: Task) {
    task = this.convertTaskDatesToLocal(task);
    const taskDTO: TaskDTO = task as TaskDTO;
    taskDTO.userEmail = localStorage.getItem('email') ?? '';
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    this.http.post<Task>('/api/task/add', task, { headers }).subscribe(() => {
      this.fetchTasks();
    });
  }

  deleteTask(id: number) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    this.http.delete('/api/task/' + id, { headers }).subscribe(() => {
      this._tasks = this._tasks.filter(task => task.id !== id);
      this.tasks.next(this._tasks);
    });
  }

  updateTask(task: Task) {
    task = this.convertTaskDatesToLocal(task);
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    this.http.put<Task>('/api/task/' + task.id, task, { headers }).subscribe((task: Task) => {
      const index = this._tasks.findIndex(t => t.id === task.id);
      this._tasks[index] = task;
      this.tasks.next(this._tasks);
    });
  }

  setTaskCompletionStatus(id: number, completed: boolean) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    this.http.put<Task>(`/api/task/complete/${id}/${completed}`, {}, { headers }).subscribe(() => {
      this.fetchTasks();
    });
  }

  private convertTaskDatesToLocal(task: Task): Task {
    if (task.deadline) {
      task.deadline = new Date(task.deadline.getTime() - new Date().getTimezoneOffset() * 60000);
    }
    if (task.completeDate) {
      task.completeDate = new Date(task.completeDate.getTime() - new Date().getTimezoneOffset() * 60000);
    }
    if (task.createdAt) {
      task.createdAt = new Date(task.createdAt.getTime() - new Date().getTimezoneOffset() * 60000);
    }
    return task;
  }
}
