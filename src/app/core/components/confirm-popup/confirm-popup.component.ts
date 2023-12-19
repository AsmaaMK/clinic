import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-confirm-popup',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss'],
})
export class ConfirmPopupComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() confirmText!: string;

  // two way binding
  @Input() show = false;
  @Output() showChange = new EventEmitter<boolean>();
  @Output() onConfirm = new EventEmitter<boolean>();

  constructor() {}

  confirm() {
    // Emit an event when the user confirms
    this.onConfirm.emit(true);
    this.closePopup();
  }

  closePopup() {
    this.show = false;
    this.showChange.next(this.show);
  }
}
