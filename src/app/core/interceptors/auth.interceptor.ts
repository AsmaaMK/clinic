import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    return next(
      req.clone({
        headers: req.headers.append('Authorization', `Bearer ${token}`),
      })
    );
  }

  return next(req);
};
