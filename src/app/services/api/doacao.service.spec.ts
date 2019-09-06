import { TestBed } from '@angular/core/testing';

import { DoacaoService } from './doacao.service';

describe('DoacaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DoacaoService = TestBed.get(DoacaoService);
    expect(service).toBeTruthy();
  });
});
