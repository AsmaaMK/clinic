import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToasterService } from '../services/toaster.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toaster: ToasterService,
    private translate: TranslateService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const authReq = this.addTokenHeader(request);

    return next.handle(authReq).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          this.authService.logout();

          this.router.navigate([
            request.url.includes('patients') ? 'login-patient' : 'login-doctor',
          ]);
          this.translate.get('toaster.401-err').subscribe((val) => {
            this.toaster.showToast(val, 'error');
          });
        }
        return throwError(error);
      })
    );
  }

  addTokenHeader(request: HttpRequest<any>) {
    const token = this.authService.getToken();

    if (this.needsAuth(request.url) && token) {
      return request.clone({
        headers: request.headers.append('Authorization', `Bearer ${token}`),
      });
    }

    return request;
  }

  needsAuth(url: string) {
    return url.includes('profile') || url.includes('record');
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
