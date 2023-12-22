import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Doctor } from '../../../core/models/doctor.model';
import { DoctorsService } from '../../../core/services/doctors.service';
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
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-doctor-update-info',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    LoadingDirective,
    NgClass,
    TranslateModule,
    NgIf,
  ],
  templateUrl: './doctor-update-info.component.html',
  styleUrl: './doctor-update-info.component.scss',
})
export class DoctorUpdateInfoComponent extends FormManage {
  doctorInfo!: Doctor;
  gettingInfo = false;
  updatingInfo = false;
  doctorInfoForm!: FormGroup;

  constructor(
    private toasterService: ToasterService,
    private doctorService: DoctorsService,
    private router: Router,
    private translateService: TranslateService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getDoctorInfo();
  }

  getDoctorInfo() {
    this.gettingInfo = true;
    this.doctorService.getLoggedInDoctorData().subscribe((res) => {
      this.gettingInfo = false;
      this.doctorInfo = res;
      this.initDoctorInfoForm();
    });
  }

  initDoctorInfoForm() {
    this.doctorInfoForm = new FormGroup({
      name: new FormControl(this.doctorInfo.name, [Validators.required]),
      specialty: new FormControl(this.doctorInfo.specialty, [
        Validators.required,
      ]),
      phone: new FormControl(this.doctorInfo.phone, [
        Validators.required,
        Validators.pattern(`[0-9]{11}`),
      ]),
      email: new FormControl(this.doctorInfo.email, [
        Validators.required,
        Validators.email,
      ]),
    });

    this.setForm(this.doctorInfoForm);
  }

  onSubmit() {
    if (this.isFormValid) {
      this.updatingInfo = true;
      this.doctorService.changeLoggedInDoctorData(this.FormValue).subscribe({
        next: () => {
          this.updatingInfo = false;
          this.translateService
            .get('toaster.profile-updated')
            .subscribe((val) => {
              this.toasterService.showToast(val, 'success');
              this.router.navigate(['/doctor/info']);
            });
        },
        error: (err) => {
          this.updatingInfo = false;
          this.toasterService.showToast(err, 'error');
        },
      });
    } else this.markAllFeildsTouched();
  }
}
