import { TestBed } from '@angular/core/testing';

import { MedicineSaleService } from './medicine-sale.service';

describe('MedicineSaleService', () => {
  let service: MedicineSaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicineSaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
