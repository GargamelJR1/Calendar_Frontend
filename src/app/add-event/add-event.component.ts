import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { EventService } from '../services/event.service';
import Modal from 'bootstrap/js/dist/modal';
import { Event } from '../models/event';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {
  @Output() modalClosed = new EventEmitter<void>();
  @Input() date?: Date;
  tagsString: string = '';

  newEvent: Event = {
    id: 0,
    name: '',
    description: '',
    startDate: this.date || new Date(),
    endDate: new Date(),
    latitude: 0,
    longitude: 0,
    address: '',
    color: '#FFFFFF',
    tags: [],
    image: undefined
  };

  constructor(private el: ElementRef, private eventService: EventService) { }

  ngAfterViewInit(): void {
    this.showModal();
  }

  showModal(): void {
    const modalElement = this.el.nativeElement.querySelector('#addEventModal');
    const modal = new Modal(modalElement);
    modal.show();

    modalElement.addEventListener('hidden.bs.modal', () => {
      this.modalClosed.emit();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['date'] && this.date) {
      this.newEvent.startDate = this.date;
      this.newEvent.endDate = this.date;
    }
  }

  // Getter to format startDate as 'YYYY-MM-DDTHH:mm'
  get formattedStartDate(): string {
    return this.formatDateToDateTimeLocal(this.newEvent.startDate);
  }

  // Setter to parse 'YYYY-MM-DDTHH:mm' back to Date
  set formattedStartDate(value: string) {
    this.newEvent.startDate = new Date(value);
  }

  // Getter to format endDate as 'YYYY-MM-DDTHH:mm'
  get formattedEndDate(): string {
    return this.formatDateToDateTimeLocal(this.newEvent.endDate);
  }

  // Setter to parse 'YYYY-MM-DDTHH:mm' back to Date
  set formattedEndDate(value: string) {
    this.newEvent.endDate = new Date(value);
  }

  // Method to format a JavaScript Date object to 'YYYY-MM-DDTHH:mm'
  formatDateToDateTimeLocal(date: Date): string {
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
    return adjustedDate.toISOString().slice(0, 16);
  }

  processTags(value: string): void {
    this.newEvent.tags = value.split(',').map(tag => tag.trim()); // Split by comma and trim whitespace
  }

  onSubmit(): void{
    this.eventService.addEvent(this.newEvent);
  }

}
