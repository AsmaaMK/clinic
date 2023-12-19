import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { ToasterService } from '../../core/components/toaster/toaster.service';
import { FormManage } from '../../core/classes/form-manage';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { LoadingDirective } from '../../core/directives/loading.directive';
import { NgClass, NgIf } from '@angular/common';
import { filter } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    LoadingDirective,
    NgClass,
    NgIf,
    TranslateModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent extends FormManage implements OnInit {
  loginForm!: FormGroup;
  userType!: 'doctors' | 'patients';
  loading = false;
  rememberMe = true;

  constructor(
    private toasterService: ToasterService,
    private authService: AuthService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.initLoginForm();
    this.userType =
      this.router.url === '/login-patient' ? 'patients' : 'doctors';

    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.userType = event.url === '/login-patient' ? 'patients' : 'doctors';
      });
  }

  initLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });

    this.setForm(this.loginForm);
  }

  onSubmit() {
    if (this.isFormValid) {
      this.loading = true;
      this.authService
        .login(
          this.FormValue.email,
          this.FormValue.password,
          this.userType,
          this.rememberMe
        )
        .subscribe({
          next: () => {
            this.loading = false;
            // if (this.authService.redirectUrl$.value !== '/')
            //   this.router.navigate([this.authService.redirectUrl$.value]);
            // else
            if (this.userType === 'doctors')
              this.router.navigate(['doctor-profile/info']);
            else this.router.navigate(['patient-profile/info']);
          },
          error: (err) => {
            this.loading = false;
            this.toasterService.showToast(err, 'error');
          },
        });
    } else this.markAllFeildsTouched();
  }
}
