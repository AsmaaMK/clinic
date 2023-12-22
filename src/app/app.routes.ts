import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpDoctorComponent } from './pages/sign-up-doctor/sign-up-doctor.component';
import { PatientsComponent } from './pages/doctor-pages/patients/patients.component';
import { DoctorRecordsComponent } from './pages/doctor-pages/doctor-records/doctor-records.component';
import { PatientRecordsComponent } from './pages/patient-pages/patient-records/patient-records.component';
import { DoctorInfoComponent } from './pages/doctor-pages/doctor-info/doctor-info.component';
import { DoctorChangePasswordComponent } from './pages/doctor-pages/doctor-change-password/doctor-change-password.component';
import { PatientInfoComponent } from './pages/patient-pages/patient-info/patient-info.component';
import { PatientChangePasswordComponent } from './pages/patient-pages/patient-change-password/patient-change-password.component';
import { SignUpPatientComponent } from './pages/sign-up-patient/sign-up-patient.component';
import { AuthGuard } from './core/guards/auth.guard';
import { DoctorUpdateInfoComponent } from './pages/doctor-pages/doctor-update-info/doctor-update-info.component';
import { PatientUpdateInfoComponent } from './pages/patient-pages/patient-update-info/patient-update-info.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login-doctor',
    component: LoginComponent,
  },
  {
    path: 'login-patient',
    component: LoginComponent,
  },
  {
    path: 'signup-doctor',
    component: SignUpDoctorComponent,
  },
  {
    path: 'signup-patient',
    component: SignUpPatientComponent,
  },
  {
    path: 'doctor',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/doctor-pages/doctor-pages.component').then(
        (x) => x.DoctorComponent
      ),
    children: [
      {
        path: 'info',
        component: DoctorInfoComponent,
      },
      {
        path: 'update-info',
        component: DoctorUpdateInfoComponent,
      },
      {
        path: 'change-password',
        component: DoctorChangePasswordComponent,
      },
      {
        path: 'patients',
        component: PatientsComponent,
      },
      {
        path: 'records',
        component: DoctorRecordsComponent,
      },
    ],
  },
  {
    path: 'patient',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/patient-pages/patient-pages.component').then(
        (x) => x.PatientComponent
      ),
    children: [
      {
        path: 'info',
        component: PatientInfoComponent,
      },
      {
        path: 'update-info',
        component: PatientUpdateInfoComponent,
      },
      {
        path: 'change-password',
        component: PatientChangePasswordComponent,
      },
      {
        path: 'records',
        component: PatientRecordsComponent,
      },
    ],
  },
];
