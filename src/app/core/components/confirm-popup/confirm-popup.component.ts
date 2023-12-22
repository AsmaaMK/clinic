import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
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

  @ViewChild('confirmPopupContainer') confirmPopupContainer!: ElementRef;

  ngAfterViewInit() {
    this.confirmPopupContainer.nativeElement.classList.add('-z-10');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['show']) {
      if (changes['show'].currentValue)
        this.confirmPopupContainer.nativeElement.classList.replace(
          '-z-10',
          'z-10'
        );
      else {
        // waite for 400ms to set the class -z-10 to close the popup with animation
        setTimeout(() => {
          this.confirmPopupContainer.nativeElement.classList.replace(
            'z-10',
            '-z-10'
          );
        }, 400);
      }
    }
  }

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
