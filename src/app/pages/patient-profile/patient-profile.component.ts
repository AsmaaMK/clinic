import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-patient-profile',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './patient-profile.component.html',
  styleUrl: './patient-profile.component.scss',
})
export class PatientProfileComponent {}
