import { TestBed } from '@angular/core/testing';

import { WindowRefService } from './window-ref.service';

describe('WindowRefService', () => {
  let service: WindowRefService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindowRefService);
  });

  it('native window returns global window', () => {
    expect(service.nativeWindow).toBe(window);
  });
});
