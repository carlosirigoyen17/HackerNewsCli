import { TestBed } from '@angular/core/testing';

import { HitsService } from './hits.service';

describe('HitsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HitsService = TestBed.get(HitsService);
    expect(service).toBeTruthy();
  });
});
