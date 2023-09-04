import { TestBed } from '@angular/core/testing';

import { HealtRecordService } from './healt-record.service';

describe('HealtRecordService', () => {
  let service: HealtRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealtRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
