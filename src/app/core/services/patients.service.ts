import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Patient, PatientData } from '../models/patient.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  private apiUrl = `${environment.apiUrl}/patients`;

  constructor(private http: HttpClient) {}

  /**
   * Sign up a new patient.
   *
   * @param patientData The data of the patient to sign up.
   * @returns An observable emitting the signed-up patient.
   */
  signup(patientData: PatientData): Observable<Patient> {
    return this.http
      .post<{
        status: 'fail' | 'success';
        token?: string;
        data?: Patient;
        message?: string;
      }>(`${this.apiUrl}/signup`, patientData)
      .pipe(
        map((res) => res.data!!),
        catchError(this.handleError)
      );
  }

  /**
   * Get the data of the currently logged-in patient.
   *
   * @returns An observable emitting the patient's data.
   */
  getLoggedInPatientData(): Observable<Patient> {
    return this.http
      .get<{ status: 'fail' | 'success'; data?: Patient; message?: string }>(
        `${this.apiUrl}/me`
      )
      .pipe(
        map((res) => res.data!!),
        catchError(this.handleError)
      );
  }

  /**
   * Change the data of the currently logged-in patient.
   *
   * @param newPatientData The new data for the patient.
   * @returns An observable emitting the updated patient data.
   */
  changeLoggedInPatientData(newPatientData: any): Observable<Patient> {
    return this.http
      .patch<{
        status: 'fail' | 'success';
        data?: Patient;
        message?: string;
      }>(`${this.apiUrl}/me`, newPatientData)
      .pipe(
        map((res) => res.data!!),
        catchError(this.handleError)
      );
  }

  /**
   * Change the password of the currently logged-in patient.
   *
   * @param oldPassword The old password of the patient.
   * @param newPassword The new password for the patient.
   * @returns An observable indicating the success of the password change.
   */
  changePassword(
    oldPassword: string,
    newPassword: string
  ): Observable<Patient> {
    return this.http
      .patch<{
        status: 'fail' | 'success';
        data?: Patient;
        message?: string;
      }>(`${this.apiUrl}/changePassword`, {
        oldPassword,
        newPassword,
      })
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
