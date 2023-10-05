import { TestBed } from '@angular/core/testing';

import { LocalStorageRefService } from './local-storage-ref.service';

describe('LocalStorageRefService', () => {
  let service: LocalStorageRefService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageRefService);
  });

  it('native local storage should return global local storage', () => {
    expect(service.nativeLocalStorage).toBe(localStorage);
  });
});
