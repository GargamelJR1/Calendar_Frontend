import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeksTaskListComponent } from './weeks-task-list.component';

describe('WeeksTaskListComponent', () => {
  let component: WeeksTaskListComponent;
  let fixture: ComponentFixture<WeeksTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeksTaskListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeeksTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
