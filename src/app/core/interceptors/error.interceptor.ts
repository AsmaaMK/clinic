import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToasterService } from '../services/toaster.service';
import { Router } from '@angular/router';
import { LangService } from '../services/lang.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  let authService = inject(AuthService);
  let router = inject(Router);
  let lang = inject(LangService);
  let toaster = inject(ToasterService);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        authService.logout();

        router.navigate([
          req.url.includes('patients') ? 'login-patient' : 'login-doctor',
        ]);

        toaster.showToast(
          lang.getLang() === 'ar'
            ? 'غير مصرح، يرجي تسجيل الدخول للمتابعة'
            : 'Unauthorized, login to continue',
          'error'
        );
      }
      return throwError(error);
    })
  );
};
