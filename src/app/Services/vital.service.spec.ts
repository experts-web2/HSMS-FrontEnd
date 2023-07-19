import { TestBed } from '@angular/core/testing';

import { VitalService } from './vital.service';

describe('VitalService', () => {
  let service: VitalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VitalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
