import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ToasterService } from '../services/toaster.service';
import { AuthService } from '../services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private toaster: ToasterService,
    private translate: TranslateService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      this.translate.get('toaster.auth-err').subscribe((val) => {
        this.toaster.showToast(val, 'error');
      });

      const cantActivateRoute = state.url;
      this.auth.redirectUrl$.next(cantActivateRoute);
      console.log(cantActivateRoute);

      this.router.navigate([
        cantActivateRoute.includes('patient')
          ? '/login-patient'
          : '/login-doctor',
      ]);
      return false;
    }
  }
}
