import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleDateModalComponent } from './schedule-date-modal.component';

describe('ScheduleDateModalComponent', () => {
  let component: ScheduleDateModalComponent;
  let fixture: ComponentFixture<ScheduleDateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleDateModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleDateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
