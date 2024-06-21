import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

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
    this.http.get<Task[]>('/api/task', { headers }).subscribe((tasks: Task[]) => {
      this._tasks = tasks;
      this.tasks.next(this._tasks);
    });
  }

  getTasksByDates(startDate: Date, endDate: Date): Task[] {
    return this._tasks.filter(task => {
      return task.deadline >= startDate && task.deadline <= endDate;
    });
  }

  addTask(task: Task) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    this.http.post<Task>('/api/task/add', task, { headers }).subscribe((task: Task) => {
      this._tasks.push(task);
      this.tasks.next(this._tasks);
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
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    this.http.put<Task>('/api/task/' + task.id, task, { headers }).subscribe((task: Task) => {
      const index = this._tasks.findIndex(t => t.id === task.id);
      this._tasks[index] = task;
      this.tasks.next(this._tasks);
    });
  }
}
