import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event, EventDTO } from '../models/event';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private _events: Event[] = [];
  events = new BehaviorSubject<Event[]>(this._events);

  constructor(private http: HttpClient) { }

  getEvents() {
    return this.events.asObservable();
  }

  fetchEvents() {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const email = localStorage.getItem('email');
    this.http.get<Event[]>(`/api/event/user/${email}`, { headers }).subscribe((events: any[]) => {
      this._events = events.map(event => ({
        ...event,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate),
        tags: event.tags.map((tag: { name: string }) => tag.name)
      }));
      this.events.next(this._events);
    });
  }

  addEvent(event: Event) {
    event = this.convertEventDatesToLocal(event); // Convert dates to local before sending
    const eventDTO: EventDTO = event as EventDTO;
    eventDTO.usersEmails = [localStorage.getItem('email') ?? ''];
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    this.http.post<Event>('/api/event/add', event, { headers }).subscribe((event: Event) => {
      this._events.push(event);
      this.events.next(this._events);
    });
  }

  deleteEvent(id: number) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    this.http.delete('/api/event/' + id, { headers }).subscribe(() => {
      this._events = this._events.filter(event => event.id !== id);
      this.events.next(this._events);
    });
  }

  updateEvent(event: Event) {
    event = this.convertEventDatesToLocal(event); // Convert dates to local before sending
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    this.http.put<Event>('/api/event/' + event.id, event, { headers }).subscribe((event: Event) => {
      const index = this._events.findIndex(t => t.id === event.id);
      this._events[index] = event;
      this.events.next(this._events);
    });
  }

  private convertEventDatesToLocal(event: Event): Event {
    if (event.startDate) {
      event.startDate = new Date(new Date(event.startDate).getTime() - new Date().getTimezoneOffset() * 60000);
    }
    if (event.endDate) {
      event.endDate = new Date(new Date(event.endDate).getTime() - new Date().getTimezoneOffset() * 60000);
    }
    return event;
  }
}
