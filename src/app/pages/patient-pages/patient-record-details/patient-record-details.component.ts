import { Component } from '@angular/core';
import { RecordsService } from '../../../core/services/records.service';
import { ActivatedRoute } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-patient-record-details',
  standalone: true,
  imports: [NgFor],
  templateUrl: './patient-record-details.component.html',
  styleUrl: './patient-record-details.component.scss',
})
export class PatientRecordDetailsComponent {
  loading = false;

  constructor(
    private recordsService: RecordsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['recordId']) {
        this.getPaitentRecord(params['recordId']);
      }
    });
  }

  getPaitentRecord(recordId: string) {
    // TODO: get paitent record by record id (No API Available)
  }
}
