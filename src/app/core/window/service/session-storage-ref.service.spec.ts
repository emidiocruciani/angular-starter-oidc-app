import { TestBed } from '@angular/core/testing';

import { SessionStorageRefService } from './session-storage-ref.service';

describe('SessionStorageRefService', () => {
  let service: SessionStorageRefService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionStorageRefService);
  });

  it('native session storage should return global session storage', () => {
    expect(service.nativeSessionStorage).toBe(sessionStorage);
  });
});
