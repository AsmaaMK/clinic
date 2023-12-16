import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientChangePasswordComponent } from './patient-change-password.component';

describe('PatientChangePasswordComponent', () => {
  let component: PatientChangePasswordComponent;
  let fixture: ComponentFixture<PatientChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientChangePasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
