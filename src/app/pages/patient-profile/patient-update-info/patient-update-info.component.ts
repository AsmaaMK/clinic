import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Patient } from '../../../core/models/patient.model';
import { PatientsService } from '../../../core/services/patients.service';
import { FormManage } from '../../../core/classes/form-manage';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToasterService } from '../../../core/components/toaster/toaster.service';
import { LoadingDirective } from '../../../core/directives/loading.directive';
import { DatePipe, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-patient-update-info',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    LoadingDirective,
    NgClass,
    TranslateModule,
    NgIf,
  ],
  providers: [DatePipe],
  templateUrl: './patient-update-info.component.html',
  styleUrl: './patient-update-info.component.scss',
})
export class PatientUpdateInfoComponent extends FormManage {
  patientInfo!: Patient;
  gettingInfo = false;
  updatingInfo = false;
  patientInfoForm!: FormGroup;

  constructor(
    private toasterService: ToasterService,
    private patientService: PatientsService,
    private router: Router,
    private translateService: TranslateService,
    private datePipe: DatePipe
  ) {
    super();
  }

  ngOnInit(): void {
    this.getPatientInfo();
  }

  getPatientInfo() {
    this.gettingInfo = true;
    this.patientService.getLoggedInPatientData().subscribe((res) => {
      this.gettingInfo = false;
      this.patientInfo = res;
      this.initPatientInfoForm();
    });
  }

  initPatientInfoForm() {
    this.patientInfoForm = new FormGroup({
      name: new FormControl(this.patientInfo.name, [Validators.required]),
      gender: new FormControl(this.patientInfo.gender, [Validators.required]),
      dateOfBirth: new FormControl(
        this.formatDate(this.patientInfo.dateOfBirth),
        [Validators.required]
      ),
      email: new FormControl(this.patientInfo.email, [
        Validators.required,
        Validators.email,
      ]),
    });

    this.setForm(this.patientInfoForm);
  }

  onSubmit() {
    if (this.isFormValid) {
      this.updatingInfo = true;
      this.patientService.changeLoggedInPatientData(this.FormValue).subscribe({
        next: () => {
          this.updatingInfo = false;
          this.translateService
            .get('toaster.profile-updated')
            .subscribe((val) => {
              this.toasterService.showToast(val, 'success');
              this.router.navigate(['/patient-profile/info']);
            });
        },
        error: (err) => {
          this.updatingInfo = false;
          this.toasterService.showToast(err, 'error');
        },
      });
    } else this.markAllFeildsTouched();
  }

  // Helper function to format date using DatePipe
  private formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }
}
