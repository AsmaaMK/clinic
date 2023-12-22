import { Component } from '@angular/core';
import { RecordsService } from '../../../core/services/records.service';
import { Record } from '../../../core/models/record.model';
import { NgFor, NgIf, NgClass, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AgePipe } from '../../../core/pipes/age.pipe';
import { Patient } from '../../../core/models/patient.model';
import { SendMessagePopupComponent } from '../../../core/components/send-message-popup/send-message-popup.component';
import { RecordPopupComponent } from '../../../core/components/record-popup/record-popup.component';

@Component({
  selector: 'app-doctor-records',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgClass,
    TranslateModule,
    AgePipe,
    DatePipe,
    RouterLink,
    SendMessagePopupComponent,
    RecordPopupComponent,
  ],
  templateUrl: './doctor-records.component.html',
  styleUrl: './doctor-records.component.scss',
})
export class DoctorRecordsComponent {
  records!: Record[];
  sendTo!: 'all' | 'patient';
  showMessagePopup = false;
  patientToSendMessage!: Patient | null;
  loading = false;
  showRecordPopup = false;
  recordToUpdate!: Record;

  constructor(private recordsService: RecordsService) {}

  ngOnInit(): void {
    this.getAllPatients();
  }

  getAllPatients() {
    this.loading = true;
    this.recordsService.getRecordsOfDoctor().subscribe((records) => {
      this.records = records;
      this.loading = false;
    });
  }

  sendMessageToPatient(patient: Patient) {
    this.patientToSendMessage = patient;
    this.sendTo = 'patient';
    this.showMessagePopup = true;
  }

  sendMessageToAll() {
    this.sendTo = 'all';
    this.patientToSendMessage = null;
    this.showMessagePopup = true;
  }

  openRecordPopup(record: Record) {
    this.showRecordPopup = true;
    this.recordToUpdate = record;
  }
}
