import { Component } from '@angular/core';
import { ChangePasswordFormComponent } from '../../../core/components/change-password-form/change-password-form.component';

@Component({
  selector: 'app-doctor-change-password',
  standalone: true,
  imports: [ChangePasswordFormComponent],
  templateUrl: './doctor-change-password.component.html',
  styleUrl: './doctor-change-password.component.scss',
})
export class DoctorChangePasswordComponent {}
