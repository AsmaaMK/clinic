import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PatientsService } from './patients.service';
import { environment } from '../../../environments/environment.development';

describe('PatientsService', () => {
  let service: PatientsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PatientsService],
    });

    service = TestBed.inject(PatientsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('signup', () => {
    it('should send a POST request and return the signed-up patient on success', () => {
      const gender: 'male' | 'female' = 'male';
      const mockPatientData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        dateOfBirth: new Date(),
        gender: gender,
      };

      const mockResponse = {
        status: 'success',
        data: {
          _id: 'someId',
          ...mockPatientData,
        },
      };

      service.signup(mockPatientData).subscribe((result) => {
        expect(result).toEqual(mockResponse.data);
      });

      const req = httpTestingController.expectOne(
        `${environment.apiUrl}/patients/signup`
      );
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });

    it('should handle errors and return an error message', () => {
      const gender: 'male' | 'female' = 'male';
      const mockPatientData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        dateOfBirth: new Date(),
        gender: gender,
      };

      const mockErrorResponse = {
        status: 'fail',
        message: 'Email already exists',
      };

      service.signup(mockPatientData).subscribe(
        () => {},
        (error) => {
          expect(error).toBe('Email already exists');
        }
      );

      const req = httpTestingController.expectOne(
        `${environment.apiUrl}/patients/signup`
      );
      expect(req.request.method).toBe('POST');
      req.flush(mockErrorResponse, { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('getLoggedInPatientData', () => {
    it('should send a GET request and return the patient data on success', () => {
      const gender: 'male' | 'female' = 'male';
      const mockResponse = {
        status: 'success',
        data: {
          _id: 'someId',
          name: 'John Doe',
          email: 'john.doe@example.com',
          dateOfBirth: new Date(),
          gender: gender,
        },
      };

      service.getLoggedInPatientData().subscribe((result) => {
        expect(result).toEqual(mockResponse.data);
      });

      const req = httpTestingController.expectOne(
        `${environment.apiUrl}/patients/me`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should handle errors and return an error message', () => {
      const mockErrorResponse = {
        status: 'fail',
        message: 'Unauthorized',
      };

      service.getLoggedInPatientData().subscribe(
        () => {},
        (error) => {
          expect(error).toBe('Unauthorized');
        }
      );

      const req = httpTestingController.expectOne(
        `${environment.apiUrl}/patients/me`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockErrorResponse, { status: 401, statusText: 'Unauthorized' });
    });
  });

  describe('changeLoggedInPatientData', () => {
    it('should send a PATCH request and return the updated patient data on success', () => {
      const mockNewPatientData = {
        name: 'New Name',
      };

      const gender: 'male' | 'female' = 'male';
      const mockResponse = {
        status: 'success',
        data: {
          _id: 'someId',
          name: 'New Name',
          email: 'john.doe@example.com',
          dateOfBirth: new Date(),
          gender: gender,
        },
      };

      service
        .changeLoggedInPatientData(mockNewPatientData)
        .subscribe((result) => {
          expect(result).toEqual(mockResponse.data);
        });

      const req = httpTestingController.expectOne(
        `${environment.apiUrl}/patients/me`
      );
      expect(req.request.method).toBe('PATCH');
      req.flush(mockResponse);
    });

    it('should handle errors and return an error message', () => {
      const mockNewPatientData = {
        name: 'New Name',
      };

      const mockErrorResponse = {
        status: 'fail',
        message: 'Unauthorized',
      };

      service.changeLoggedInPatientData(mockNewPatientData).subscribe(
        () => {},
        (error) => {
          expect(error).toBe('Unauthorized');
        }
      );

      const req = httpTestingController.expectOne(
        `${environment.apiUrl}/patients/me`
      );
      expect(req.request.method).toBe('PATCH');
      req.flush(mockErrorResponse, { status: 401, statusText: 'Unauthorized' });
    });
  });
});
