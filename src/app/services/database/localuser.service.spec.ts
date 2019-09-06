import { TestBed } from '@angular/core/testing';

import { LocaluserService } from './localuser.service';

describe('LocaluserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocaluserService = TestBed.get(LocaluserService);
    expect(service).toBeTruthy();
  });
});
