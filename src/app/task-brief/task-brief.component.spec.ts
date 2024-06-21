import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskBriefComponent } from './task-brief.component';

describe('TaskBriefComponent', () => {
  let component: TaskBriefComponent;
  let fixture: ComponentFixture<TaskBriefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskBriefComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskBriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
