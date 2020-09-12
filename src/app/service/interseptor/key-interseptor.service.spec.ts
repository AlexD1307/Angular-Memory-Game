import { TestBed } from '@angular/core/testing';

import { KeyInterceptors } from './key-interseptor.service';

describe('KeyInterseptor', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KeyInterceptors = TestBed.get(KeyInterceptors);
    expect(service).toBeTruthy();
  });
});
