import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-patient-pages',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './patient-pages.component.html',
  styleUrl: './patient-pages.component.scss',
})
export class PatientComponent {}
