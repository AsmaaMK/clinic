import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DoctorsService } from './doctors.service';
import { environment } from '../../../environments/environment.development';

describe('DoctorsService', () => {
  let service: DoctorsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DoctorsService],
    });

    service = TestBed.inject(DoctorsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('signup', () => {
    it('should send a POST request and return the doctor on success', () => {
      const mockDoctorData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123456789',
        specialty: 'Cardiology',
      };

      const mockResponse = {
        status: 'success',
        data: {
          _id: 'someId',
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '123456789',
          specialty: 'Cardiology',
        },
      };

      service.signup(mockDoctorData).subscribe((result) => {
        expect(result).toEqual(mockResponse.data);
      });

      const req = httpTestingController.expectOne(
        `${environment.apiUrl}/doctors/signup`
      );
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });

    it('should handle errors and return an error message', () => {
      const mockDoctorData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123456789',
        specialty: 'Cardiology',
      };

      const mockErrorResponse = {
        status: 'fail',
        message: 'Email already exists',
      };

      service.signup(mockDoctorData).subscribe(
        () => {},
        (error) => {
          expect(error).toBe('Email already exists');
        }
      );

      const req = httpTestingController.expectOne(
        `${environment.apiUrl}/doctors/signup`
      );
      expect(req.request.method).toBe('POST');
      req.flush(mockErrorResponse, { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('getLoggedInDoctorData', () => {
    it('should send a GET request and return the doctor on success', () => {
      const mockResponse = {
        status: 'success',
        data: {
          _id: 'someId',
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '123456789',
          specialty: 'Cardiology',
        },
      };

      service.getLoggedInDoctorData().subscribe((result) => {
        expect(result).toEqual(mockResponse.data);
      });

      const req = httpTestingController.expectOne(
        `${environment.apiUrl}/doctors/me`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should handle errors and return an error message', () => {
      const mockErrorResponse = {
        status: 'fail',
        message: 'Unauthorized',
      };

      service.getLoggedInDoctorData().subscribe(
        () => {},
        (error) => {
          expect(error).toBe('Unauthorized');
        }
      );

      const req = httpTestingController.expectOne(
        `${environment.apiUrl}/doctors/me`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockErrorResponse, { status: 401, statusText: 'Unauthorized' });
    });
  });

  describe('changeLoggedInDoctorData', () => {
    it('should send a PATCH request and return the updated doctor on success', () => {
      const mockNewDoctorData = {
        name: 'New Name',
        phone: '987654321',
      };

      const mockResponse = {
        status: 'success',
        data: {
          _id: 'someId',
          name: 'New Name',
          email: 'john.doe@example.com',
          phone: '987654321',
          specialty: 'Cardiology',
        },
      };

      service
        .changeLoggedInDoctorData(mockNewDoctorData)
        .subscribe((result) => {
          expect(result).toEqual(mockResponse.data);
        });

      const req = httpTestingController.expectOne(
        `${environment.apiUrl}/doctors/me`
      );
      expect(req.request.method).toBe('PATCH');
      req.flush(mockResponse);
    });

    it('should handle errors and return an error message', () => {
      const mockNewDoctorData = {
        name: 'New Name',
        phone: '987654321',
      };

      const mockErrorResponse = {
        status: 'fail',
        message: 'Unauthorized',
      };

      service.changeLoggedInDoctorData(mockNewDoctorData).subscribe(
        () => {},
        (error) => {
          expect(error).toBe('Unauthorized');
        }
      );

      const req = httpTestingController.expectOne(
        `${environment.apiUrl}/doctors/me`
      );
      expect(req.request.method).toBe('PATCH');
      req.flush(mockErrorResponse, { status: 401, statusText: 'Unauthorized' });
    });
  });

  describe('changePassword', () => {
    it('should send a PATCH request and return doctor data on success', () => {
      const mockOldPassword = 'oldPassword123';
      const mockNewPassword = 'newPassword456';

      const mockResponse = {
        status: 'success',
        data: {
          _id: 'someId',
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '123456789',
          specialty: 'Cardiology',
        },
      };

      service
        .changePassword(mockOldPassword, mockNewPassword)
        .subscribe((result) => {
          expect(result).toEqual(mockResponse.data);
        });

      const req = httpTestingController.expectOne(
        `${environment.apiUrl}/doctors/changePassword`
      );
      expect(req.request.method).toBe('PATCH');
      req.flush(mockResponse);
    });

    it('should handle errors and return an error message', () => {
      const mockOldPassword = 'oldPassword123';
      const mockNewPassword = 'newPassword456';

      const mockErrorResponse = {
        status: 'fail',
        message: 'Unauthorized',
      };

      service.changePassword(mockOldPassword, mockNewPassword).subscribe(
        () => {},
        (error) => {
          expect(error).toBe('Unauthorized');
        }
      );

      const req = httpTestingController.expectOne(
        `${environment.apiUrl}/doctors/changePassword`
      );
      expect(req.request.method).toBe('PATCH');
      req.flush(mockErrorResponse, { status: 401, statusText: 'Unauthorized' });
    });
  });
});
