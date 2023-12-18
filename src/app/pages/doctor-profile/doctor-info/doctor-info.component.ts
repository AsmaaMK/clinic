import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Doctor } from '../../../core/models/doctor.model';
import { DoctorsService } from '../../../core/services/doctors.service';
import { LoadingDirective } from '../../../core/directives/loading.directive';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-doctor-info',
  standalone: true,
  imports: [RouterLink, LoadingDirective, NgClass],
  templateUrl: './doctor-info.component.html',
  styleUrl: './doctor-info.component.scss',
})
export class DoctorInfoComponent implements OnInit {
  doctorInfo!: Doctor;
  loading = false;
  showLogoutModal = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private doctorService: DoctorsService
  ) {}

  ngOnInit(): void {
    this.getDoctorInfo();
  }

  getDoctorInfo() {
    this.loading = true;
    this.doctorService.getLoggedInDoctorData().subscribe((res) => {
      this.loading = false;
      this.doctorInfo = res;
    });
  }

  logout() {
    this.authService.logout();
    this.showLogoutModal = false;
    this.router.navigate(['/']);
  }
}
