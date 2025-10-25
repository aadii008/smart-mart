import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewUserDetailsComponent } from './adminviewuserdetails.component';

describe('AdminviewuserdetailsComponent', () => {
  let component: AdminViewUserDetailsComponent;
  let fixture: ComponentFixture<AdminViewUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewUserDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
