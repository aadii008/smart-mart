import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminfeedbackstatisticsComponent } from './adminfeedbackstatistics.component';

describe('AdminfeedbackstatisticsComponent', () => {
  let component: AdminfeedbackstatisticsComponent;
  let fixture: ComponentFixture<AdminfeedbackstatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminfeedbackstatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminfeedbackstatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
