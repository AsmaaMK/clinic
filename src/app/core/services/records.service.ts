import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Record } from '../models/record.model';

@Injectable({
  providedIn: 'root',
})
export class RecordsService {
  apiUrl = `${environment.apiUrl}/records`;

  constructor(private http: HttpClient) {}

  /**
   * Create a new record between new patient and current loggedin doctor (needs doctor auth)
   *
   * @param doctorId current logged in doctor id
   * @param patientId new patient id (patient doesn't have a record with this doctor)
   * @param notes notes of the recorded session
   * @param sessionDate session date
   * @param treatment treatment of the patient
   * @returns An observable emitting the created record.
   */
  createRecord(
    doctorId: string,
    patientId: string,
    notes: string,
    sessionDate: Date,
    treatment: string
  ): Observable<Record> {
    return this.http
      .post<{
        status: 'fail' | 'success';
        data?: Record;
        message?: string;
      }>(`${this.apiUrl}`, {
        doctorId,
        patientId,
        notes,
        sessionDate,
        treatment,
      })
      .pipe(
        map((res) => res.data!!),
        catchError(this.handleError)
      );
  }

  /**
   * Update existing record (needs doctor auth)
   *
   * @param notes notes of the recorded session
   * @param sessionDate session date
   * @param treatment treatment of the patient
   * @returns An observable emitting the updated record.
   */
  updateRecord(
    patientId: string,
    notes: string,
    sessionDate: Date,
    treatment: string
  ): Observable<Record> {
    return this.http
      .patch<{
        status: 'fail' | 'success';
        data?: Record;
        message?: string;
      }>(`${this.apiUrl}/owned/${patientId}`, {
        notes,
        sessionDate,
        treatment,
      })
      .pipe(
        map((res) => res.data!!),
        catchError(this.handleError)
      );
  }

  /**
   * Send a new message to all the patients that has record with the current logged in doctor (needs doctor auth)
   *
   * @param message
   * @returns observable of {} there is no content of the response (204)
   */
  sendMessageToAllDoctorPatients(message: string): Observable<{}> {
    return this.http.patch(`${this.apiUrl}/owned/send-message`, { message });
  }

  /**
   * Send a new message to a patient that has a record with the current logged in doctor (needs doctor auth)
   *
   * @param message
   * @returns observable of {} there is no content of the response (204)
   */
  sendMessageToPatient(message: string, patientId: string): Observable<{}> {
    return this.http.patch(`${this.apiUrl}/owned/send-message/${patientId}`, {
      message,
    });
  }

  /**
   * Get all records of the current loggedin doctor (needs doctor auth)
   *
   * @returns An observable emitting array of records
   */
  getRecordsOfDoctor(): Observable<Record[]> {
    return this.http
      .get<{
        status: 'fail' | 'success';
        data?: Record[];
        message?: string;
      }>(`${this.apiUrl}/owned`)
      .pipe(
        map((res) => res.data!!),
        catchError(this.handleError)
      );
  }

  /**
   * Get all records of the current loggedin doctor (needs doctor auth)
   *
   * @returns An observable emitting the record details of this patient
   */
  getRecordOfOneOwnedPatient(patientId: string): Observable<Record> {
    return this.http
      .get<{
        status: 'fail' | 'success';
        data?: Record;
        message?: string;
      }>(`${this.apiUrl}/owned/${patientId}`)
      .pipe(
        map((res) => res.data!!),
        catchError(this.handleError)
      );
  }

  /**
   * Get all records of the current loggedin patient (needs patient auth)
   *
   * @returns An observable emitting array of records
   */
  getAllRecordsOfPatient(): Observable<Record[]> {
    return this.http
      .get<{
        status: 'fail' | 'success';
        data?: Record[];
        message?: string;
      }>(`${this.apiUrl}/patient/owned`)
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
