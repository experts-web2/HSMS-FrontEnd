import { TestBed } from '@angular/core/testing';

import { MedicineSaltsService } from './medicine-salts.service';

describe('MedicineSaltsService', () => {
  let service: MedicineSaltsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicineSaltsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
