import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateRecordComponent } from './create-update-record.component';

describe('CreateUpdateRecordComponent', () => {
  let component: CreateUpdateRecordComponent;
  let fixture: ComponentFixture<CreateUpdateRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdateRecordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUpdateRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
