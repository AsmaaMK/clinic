import { Component, OnInit } from '@angular/core';
import { PatientsService } from '../../../core/services/patients.service';
import { Patient } from '../../../core/models/patient.model';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AgePipe } from '../../../core/pipes/age.pipe';
import { RouterLink } from '@angular/router';
import { RecordPopupComponent } from '../../../core/components/record-popup/record-popup.component';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgClass,
    TranslateModule,
    AgePipe,
    RouterLink,
    RecordPopupComponent,
  ],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss',
})
export class PatientsComponent implements OnInit {
  patients!: Patient[];
  loading = false;
  showRecordPopup = false;
  patientIdToCreateRecord!: string;

  constructor(private patientsService: PatientsService) {}

  ngOnInit(): void {
    this.getAllPatients();
  }

  getAllPatients() {
    this.loading = true;
    this.patientsService.getAllPatients().subscribe((patients) => {
      this.patients = patients;
      this.loading = false;
    });
  }

  openRecordPopup(patientId: string) {
    this.showRecordPopup = true;
    this.patientIdToCreateRecord = patientId;
  }
}
