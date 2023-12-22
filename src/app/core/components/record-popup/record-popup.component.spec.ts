import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordPopupComponent } from './record-popup.component';

describe('CreateRecordPopupComponent', () => {
  let component: RecordPopupComponent;
  let fixture: ComponentFixture<RecordPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecordPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
