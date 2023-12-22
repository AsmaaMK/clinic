import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-doctor-pages',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './doctor-pages.component.html',
  styleUrl: './doctor-pages.component.scss',
})
export class DoctorComponent {}
