import { TestBed } from '@angular/core/testing';

import { BackEnd } from './back-end';

describe('BackEnd', () => {
  let service: BackEnd;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackEnd);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
