import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RecordsService } from '../../services/records.service';
import { ToasterService } from '../toaster/toaster.service';
import { NgClass, NgIf } from '@angular/common';
import { LoadingDirective } from '../../directives/loading.directive';
import { Patient } from '../../models/patient.model';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-send-message-popup',
  standalone: true,
  imports: [NgIf, NgClass, TranslateModule, LoadingDirective, FormsModule],
  templateUrl: './send-message-popup.component.html',
  styleUrl: './send-message-popup.component.scss',
})
export class SendMessagePopupComponent {
  /**
   * required
   * */
  @Input() sendTo!: 'all' | 'patient';

  /**
   * required if sendTo = 'patient'
   */
  @Input() patient!: Patient | null;

  /**
   * required
   * two way binding
   * */
  @Input() show = false;
  @Output() showChange = new EventEmitter<boolean>();

  message!: string | null;
  sending = false;

  constructor(
    private recordService: RecordsService,
    private toaster: ToasterService
  ) {}

  sendToAll() {
    if (this.message) {
      this.sending = true;
      this.recordService
        .sendMessageToAllDoctorPatients(this.message)
        .subscribe({
          next: () => {
            this.closePopup();
            this.toaster.showToast(
              'Message sent to your patients successfully.',
              'success'
            );
          },
          error: (err) => {
            this.toaster.showToast(err, 'error');
          },
        });
    }
  }

  sendToPatient() {
    if (this.message && this.patient) {
      this.sending = true;
      this.recordService
        .sendMessageToPatient(this.message, this.patient._id)
        .subscribe({
          next: () => {
            this.closePopup();
            this.toaster.showToast(
              `Message sent to ${this.patient?.name} successfully.`,
              'success'
            );
          },
          error: (err) => {
            this.toaster.showToast(err, 'error');
          },
        });
    }
  }

  closePopup() {
    this.show = false;
    this.sending = false;
    this.message = null;
    this.showChange.next(this.show);
  }
}
