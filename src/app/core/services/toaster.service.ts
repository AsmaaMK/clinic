import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  private toastSubject = new BehaviorSubject<{
    message: string;
    status: 'success' | 'error';
  } | null>(null);
  toast$ = this.toastSubject.asObservable();

  showToast(message: string, status: 'success' | 'error') {
    this.toastSubject.next({ message, status });
  }

  clearToast() {
    this.toastSubject.next(null);
  }
}
