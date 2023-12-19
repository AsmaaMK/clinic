import { Component, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormManage } from '../../classes/form-manage';
import { ToasterService } from '../toaster/toaster.service';
import { LoadingDirective } from '../../directives/loading.directive';
import { NgClass, NgIf } from '@angular/common';
import { UserType } from '../../models/user-type.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-change-password-form',
  standalone: true,
  imports: [
    RouterLink,
    TranslateModule,
    ReactiveFormsModule,
    LoadingDirective,
    NgClass,
    NgIf,
  ],
  templateUrl: './change-password-form.component.html',
  styleUrl: './change-password-form.component.scss',
})
export class ChangePasswordFormComponent extends FormManage {
  @Input() userType!: UserType;
  passwordForm!: FormGroup;
  updatingPassword = false;

  constructor(
    private toasterService: ToasterService,
    private authService: AuthService,
    private router: Router,
    private translateService: TranslateService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initPasswordForm();
  }

  initPasswordForm() {
    this.passwordForm = new FormGroup({
      oldPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });

    this.setForm(this.passwordForm);
  }

  onSubmit() {
    if (this.isFormValid) {
      this.updatingPassword = true;
      this.authService
        .changePassword(
          this.FormValue.oldPassword,
          this.FormValue.newPassword,
          this.userType
        )
        .subscribe({
          next: () => {
            this.updatingPassword = false;
            this.translateService
              .get('toaster.password-updated')
              .subscribe((val) => {
                this.toasterService.showToast(val, 'success');
                this.authService.logout();
                this.router.navigate([
                  this.userType === 'doctors'
                    ? '/login-doctor'
                    : '/login-patient',
                ]);
              });
          },
          error: (err) => {
            this.updatingPassword = false;
            this.toasterService.showToast(err, 'error');
          },
        });
    } else this.markAllFeildsTouched();
  }
}
