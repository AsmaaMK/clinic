import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMessagePopupComponent } from './send-message-popup.component';

describe('SendMessagePopupComponent', () => {
  let component: SendMessagePopupComponent;
  let fixture: ComponentFixture<SendMessagePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendMessagePopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SendMessagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
