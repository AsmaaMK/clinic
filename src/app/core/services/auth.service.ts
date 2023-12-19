import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, BehaviorSubject, Observable, throwError, catchError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { StorageService } from './storage.service';
import { UserType } from '../models/user-type.model';

export const USER_STORAGE_KEY = 'user-data';
export const AUTH_REDIRECT_URL_KEY = 'redirect';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = `${environment.apiUrl}`;
  redirectUrl$!: BehaviorSubject<string>;
  isLoggedIn$ = new BehaviorSubject(this.isLoggedIn());

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    const storedRedirectUrl = this.storageService.getLocalStorageValue(
      AUTH_REDIRECT_URL_KEY
    );
    this.redirectUrl$ = new BehaviorSubject(
      storedRedirectUrl ? storedRedirectUrl : '/'
    );
    this.redirectUrl$.subscribe((url) => {
      this.storageService.setLocalStorageValue(AUTH_REDIRECT_URL_KEY, url);
    });
  }

  getUserDataFormStorage() {
    let user = this.storageService.getLocalStorageValue(USER_STORAGE_KEY);
    if (!user)
      user = this.storageService.getSessionStorageValue(USER_STORAGE_KEY);
    return user;
  }

  /**
   *
   * @param email
   * @param password
   * @param userType
   * @param rememberMe
   * @returns
   */
  login(
    email: string,
    password: string,
    userType: UserType,
    rememberMe: boolean
  ) {
    let loginUrl = `${this.apiUrl}/${userType}/login`;
    return this.http.post<any>(loginUrl, { email, password }).pipe(
      map((res) => {
        if (rememberMe)
          this.storageService.setLocalStorageValue(USER_STORAGE_KEY, {
            ...res.data,
            token: res.token,
          });
        else
          this.storageService.setSessionStorageValue(USER_STORAGE_KEY, {
            ...res.data,
            token: res.token,
          });
        this.isLoggedIn$.next(true);
        return res.data;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Change the password of the currently logged-in user.
   *
   * @param oldPassword The old password of the doctor.
   * @param newPassword The new password for the doctor.
   * @param userType The logged in user type (patients | doctors)
   * @returns An observable indicating the success of the password change.
   */
  changePassword(
    oldPassword: string,
    newPassword: string,
    userType: UserType
  ): Observable<any> {
    return this.http
      .patch<any>(`${this.apiUrl}/${userType}/changePassword`, {
        oldPassword,
        newPassword,
      })
      .pipe(
        map((res) => res.data!!),
        catchError(this.handleError)
      );
  }

  logout() {
    this.isLoggedIn$.next(false);
    this.storageService.clearSessionStorage();
    this.storageService.clearLocalStorage();
  }

  getToken(): string | null {
    let userData = this.storageService.getLocalStorageValue(USER_STORAGE_KEY);
    if (!userData)
      userData = this.storageService.getSessionStorageValue(USER_STORAGE_KEY);

    return userData ? userData.token : null;
  }

  isLoggedIn(): boolean {
    return this.getToken() ? true : false;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    // Check if the error has a status and a message
    if (error.status && error.error.message) {
      errorMessage = error.error.message;
    }

    // Log the detailed error in the console
    console.error(error);

    // Display a user-friendly error message
    console.error('Error: ', errorMessage);

    // Pass the error message along to the calling code
    return throwError(errorMessage);
  }
}
