import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormManage } from '../../core/classes/form-manage';
import { ToasterService } from '../../core/services/toaster.service';
import { NgClass, NgIf } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LoadingDirective } from '../../core/directives/loading.directive';
import { DoctorsService } from '../../core/services/doctors.service';

@Component({
  selector: 'app-sign-up-doctor',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    LoadingDirective,
    NgClass,
    NgIf,
    TranslateModule,
  ],
  templateUrl: './sign-up-doctor.component.html',
  styleUrl: './sign-up-doctor.component.scss',
})
export class SignUpDoctorComponent extends FormManage implements OnInit {
  registerForm!: FormGroup;
  loading = false;

  constructor(
    private toasterService: ToasterService,
    private doctorService: DoctorsService,
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
      specialty: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(`[0-9]{11}`),
      ]),
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
      this.doctorService.signup(this.FormValue).subscribe({
        next: () => {
          this.loading = false;
          this.translateService
            .get('toaster.signup-success')
            .subscribe((val) => {
              this.toasterService.showToast(val, 'success');
              this.router.navigate(['/login-doctor']);
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
