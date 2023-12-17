import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-doctor-profile',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './doctor-profile.component.html',
  styleUrl: './doctor-profile.component.scss',
})
export class DoctorProfileComponent {}
