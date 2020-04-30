import { TestBed } from '@angular/core/testing';

import { EncrDecrService } from './crypto.service';

describe('CryptoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EncrDecrService = TestBed.get(EncrDecrService);
    expect(service).toBeTruthy();
  });
});
