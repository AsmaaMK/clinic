import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToasterService } from './toaster.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss',
})
export class ToasterComponent implements OnDestroy {
  private subscription: Subscription;
  message: string | undefined;
  status!: 'success' | 'error';

  constructor(private toasterService: ToasterService) {
    this.subscription = this.toasterService.toast$.subscribe((val) => {
      this.message = val?.message;

      if (val) {
        this.status = val.status;
        setTimeout(() => this.clearToast(), 10000); // Auto-close after 10 secods
      }
    });
  }

  clearToast() {
    this.toasterService.clearToast();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
