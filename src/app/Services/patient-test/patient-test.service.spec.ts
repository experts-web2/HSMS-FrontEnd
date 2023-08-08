import { TestBed } from '@angular/core/testing';

import { PatientTestService } from './patient-test.service';

describe('PatientTestService', () => {
  let service: PatientTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
