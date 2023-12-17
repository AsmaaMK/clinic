import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientUpdateInfoComponent } from './patient-update-info.component';

describe('PatientUpdateInfoComponent', () => {
  let component: PatientUpdateInfoComponent;
  let fixture: ComponentFixture<PatientUpdateInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientUpdateInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientUpdateInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
