import { TestBed } from '@angular/core/testing';

import { AutomapperService } from './automapper.service';

describe('AutomapperService', () => {
  let service: AutomapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutomapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
