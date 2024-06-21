import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthTaskListComponent } from './month-task-list.component';

describe('MonthTaskListComponent', () => {
  let component: MonthTaskListComponent;
  let fixture: ComponentFixture<MonthTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthTaskListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonthTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
