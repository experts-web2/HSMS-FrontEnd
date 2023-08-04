import { TestBed } from '@angular/core/testing';

import { MedicineBrandService } from './medicine-brand.service';

describe('MedicineBrandService', () => {
  let service: MedicineBrandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicineBrandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
