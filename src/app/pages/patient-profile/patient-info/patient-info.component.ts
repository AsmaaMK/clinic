import { Component } from '@angular/core';
import { Patient } from '../../../core/models/patient.model';
import { AuthService } from '../../../core/services/auth.service';
import { PatientsService } from '../../../core/services/patients.service';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmPopupComponent } from '../../../core/components/confirm-popup/confirm-popup.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-patient-info',
  standalone: true,
  imports: [RouterLink, TranslateModule, ConfirmPopupComponent, DatePipe],
  templateUrl: './patient-info.component.html',
  styleUrl: './patient-info.component.scss',
})
export class PatientInfoComponent {
  patientInfo!: Patient;
  loading = false;
  showLogoutModal = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private patientService: PatientsService
  ) {}

  ngOnInit(): void {
    this.getPatientInfo();
  }

  getPatientInfo() {
    this.loading = true;
    this.patientService.getLoggedInPatientData().subscribe((res) => {
      this.loading = false;
      this.patientInfo = res;
    });
  }

  logout() {
    this.authService.logout();
    this.showLogoutModal = false;
    this.router.navigate(['/']);
  }
}
