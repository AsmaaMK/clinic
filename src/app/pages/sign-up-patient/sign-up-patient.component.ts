import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormManage } from '../../core/classes/form-manage';
import { LoadingDirective } from '../../core/directives/loading.directive';
import { ToasterService } from '../../core/components/toaster/toaster.service';
import { PatientsService } from '../../core/services/patients.service';

@Component({
  selector: 'app-sign-up-patient',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    LoadingDirective,
    NgClass,
    NgIf,
    TranslateModule,
  ],
  templateUrl: './sign-up-patient.component.html',
  styleUrl: './sign-up-patient.component.scss',
})
export class SignUpPatientComponent extends FormManage implements OnInit {
  registerForm!: FormGroup;
  loading = false;

  constructor(
    private toasterService: ToasterService,
    private patientService: PatientsService,
    private router: Router,
    private translateService: TranslateService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initRegisterForm();
  }

  initRegisterForm() {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });

    this.setForm(this.registerForm);
  }

  onSubmit() {
    if (this.isFormValid) {
      this.loading = true;
      this.patientService.signup(this.FormValue).subscribe({
        next: () => {
          this.loading = false;
          this.translateService
            .get('toaster.signup-success')
            .subscribe((val) => {
              this.toasterService.showToast(val, 'success');
              this.router.navigate(['/login-patient']);
            });
        },
        error: (err) => {
          this.loading = false;
          this.toasterService.showToast(err, 'error');
        },
      });
    } else this.markAllFeildsTouched();
  }
}
