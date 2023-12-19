import { Component } from '@angular/core';
import { ChangePasswordFormComponent } from '../../../core/components/change-password-form/change-password-form.component';

@Component({
  selector: 'app-patient-change-password',
  standalone: true,
  imports: [ChangePasswordFormComponent],
  templateUrl: './patient-change-password.component.html',
  styleUrl: './patient-change-password.component.scss',
})
export class PatientChangePasswordComponent {}
