import { TestBed } from '@angular/core/testing';

import { TestCategoryService } from './test-category.service';

describe('TestCategoryService', () => {
  let service: TestCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
