import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpDoctorComponent } from './sign-up-doctor.component';

describe('SignUpDoctorComponent', () => {
  let component: SignUpDoctorComponent;
  let fixture: ComponentFixture<SignUpDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpDoctorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignUpDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
