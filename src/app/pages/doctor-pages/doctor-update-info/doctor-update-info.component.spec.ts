import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorUpdateInfoComponent } from './doctor-update-info.component';

describe('DoctorUpdateInfoComponent', () => {
  let component: DoctorUpdateInfoComponent;
  let fixture: ComponentFixture<DoctorUpdateInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorUpdateInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorUpdateInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
