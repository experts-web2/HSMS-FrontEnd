import { TestBed } from '@angular/core/testing';

import { MedicinePurchaseService } from './medicine-purchase.service';

describe('MedicinePurchaseService', () => {
  let service: MedicinePurchaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicinePurchaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
