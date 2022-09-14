import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCreaterDialogComponent } from './task-creater-dialog.component';

describe('TaskCreaterDialogComponent', () => {
  let component: TaskCreaterDialogComponent;
  let fixture: ComponentFixture<TaskCreaterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskCreaterDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskCreaterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
