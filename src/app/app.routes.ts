import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpDoctorComponent } from './pages/sign-up-doctor/sign-up-doctor.component';
import { DoctorPatientsComponent } from './pages/doctor-profile/doctor-patients/doctor-patients.component';
import { DoctorRecordsComponent } from './pages/doctor-profile/doctor-records/doctor-records.component';
import { PatientRecordsComponent } from './pages/patient-profile/patient-records/patient-records.component';
import { DoctorInfoComponent } from './pages/doctor-profile/doctor-info/doctor-info.component';
import { DoctorChangePasswordComponent } from './pages/doctor-profile/doctor-change-password/doctor-change-password.component';
import { PatientInfoComponent } from './pages/patient-profile/patient-info/patient-info.component';
import { PatientChangePasswordComponent } from './pages/patient-profile/patient-change-password/patient-change-password.component';
import { SignUpPatientComponent } from './pages/sign-up-patient/sign-up-patient.component';
import { CreateUpdateRecordComponent } from './pages/create-update-record/create-update-record.component';
import { AuthGuard } from './core/guards/auth.guard';
import { DoctorUpdateInfoComponent } from './pages/doctor-profile/doctor-update-info/doctor-update-info.component';
import { PatientUpdateInfoComponent } from './pages/patient-profile/patient-update-info/patient-update-info.component';

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
    path: 'doctor-profile',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/doctor-profile/doctor-profile.component').then(
        (x) => x.DoctorProfileComponent
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
        component: DoctorPatientsComponent,
      },
      {
        path: 'records',
        component: DoctorRecordsComponent,
      },
    ],
  },
  {
    path: 'patient-profile',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/patient-profile/patient-profile.component').then(
        (x) => x.PatientProfileComponent
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
  {
    path: 'create-record',
    canActivate: [AuthGuard],
    component: CreateUpdateRecordComponent,
  },
  {
    path: 'update-record/:recordId',
    canActivate: [AuthGuard],
    component: CreateUpdateRecordComponent,
  },
];
