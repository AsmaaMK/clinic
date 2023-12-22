import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Record } from '../../../core/models/record.model';
import { RecordsService } from '../../../core/services/records.service';

@Component({
  selector: 'app-patient-records',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, TranslateModule, DatePipe],
  templateUrl: './patient-records.component.html',
  styleUrl: './patient-records.component.scss',
})
export class PatientRecordsComponent {
  loading = false;
  records: Record[] = [];

  constructor(private recordsService: RecordsService) {}

  ngOnInit() {
    this.getPaitentRecords();
  }

  getPaitentRecords() {
    this.loading = true;
    this.recordsService.getAllRecordsOfPatient().subscribe((records) => {
      this.records = records;
      this.loading = false;
    });
  }
}
