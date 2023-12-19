import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Doctor, DoctorData } from '../models/doctor.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class DoctorsService {
  private apiUrl = `${environment.apiUrl}/doctors`;

  constructor(private http: HttpClient) {}

  /**
   * Sign up a new doctor.
   *
   * @param doctorData The data of the doctor to sign up.
   * @returns An observable emitting the signed-up doctor.
   */
  signup(doctorData: DoctorData): Observable<Doctor> {
    return this.http
      .post<{
        status: 'fail' | 'success';
        token?: string;
        data?: Doctor;
        message?: string;
      }>(`${this.apiUrl}/signup`, doctorData)
      .pipe(
        map((res) => res.data!!),
        catchError(this.handleError)
      );
  }

  /**
   * Get the data of the currently logged-in doctor.
   *
   * @returns An observable emitting the doctor's data.
   */
  getLoggedInDoctorData(): Observable<Doctor> {
    return this.http
      .get<{ status: 'fail' | 'success'; data?: Doctor; message?: string }>(
        `${this.apiUrl}/me`
      )
      .pipe(
        map((res) => res.data!!),
        catchError(this.handleError)
      );
  }

  /**
   * Change the data of the currently logged-in doctor.
   *
   * @param newDoctorData The new data for the doctor.
   * @returns An observable emitting the updated doctor data.
   */
  changeLoggedInDoctorData(newDoctorData: any): Observable<Doctor> {
    return this.http
      .patch<{
        status: 'fail' | 'success';
        data?: Doctor;
        message?: string;
      }>(`${this.apiUrl}/me`, newDoctorData)
      .pipe(
        map((res) => res.data!!),
        catchError(this.handleError)
      );
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
