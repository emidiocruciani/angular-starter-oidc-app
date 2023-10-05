import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { LocalStorageRefService } from '@app/core/window/service/local-storage-ref.service';
import { localStorageRefStubFactory } from '@app/core/testing/mock-factories-registry.spec';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let localStorageRef: LocalStorageRefService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LocalStorageRefService, useFactory: localStorageRefStubFactory }
      ]
    });

    service = TestBed.inject(AuthenticationService);
    localStorageRef = TestBed.inject(LocalStorageRefService);
  });

  it('should return true if access token is in local storage', () => {
    spyOn(localStorageRef.nativeLocalStorage, 'getItem').and.returnValue('mockaccesstoken');

    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should return false if access token is not in local storage', () => {
    spyOn(localStorageRef.nativeLocalStorage, 'getItem').and.returnValue('');

    expect(service.isAuthenticated()).toBeFalse();
  });
});
