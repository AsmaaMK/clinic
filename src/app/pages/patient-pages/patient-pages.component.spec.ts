import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientComponent } from './patient-pages.component';

describe('PatientProfileComponent', () => {
  let component: PatientComponent;
  let fixture: ComponentFixture<PatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
