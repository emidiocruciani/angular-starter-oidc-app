import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { authenticatedGuard } from './authenticated.guard';
import { AuthenticationService } from '../service/authentication.service';
import { ConfigService } from '@app/core/config/service/config.service';
import { activatedRouteSnapshotStubFactory, authenticationStubFactory, configStubFactory, routerStateSnapshotStubFactory, routerStubFactory } from '@app/core/testing/mock-factories-registry.spec';

describe('authenticatedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authenticatedGuard(...guardParameters));

  let authentication: AuthenticationService;
  let config: ConfigService;
  let router: Router;
  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthenticationService, useFactory: authenticationStubFactory },
        { provide: ConfigService, useFactory: configStubFactory },
        { provide: Router, useFactory: routerStubFactory }
      ]
    });

    authentication = TestBed.inject(AuthenticationService);
    config = TestBed.inject(ConfigService);
    router = TestBed.inject(Router);
    route = activatedRouteSnapshotStubFactory();
    state = routerStateSnapshotStubFactory();

    spyOn(router, 'navigateByUrl').and.stub();
    spyOnProperty(config, 'loginUri', 'get').and.returnValue('/login');
  });

  it('should return true when authenticated', () => {
    spyOn(authentication, 'isAuthenticated').and.returnValue(true);

    expect(executeGuard(route, state)).toBeTrue();
  });

  it('should return false when not authenticated', () => {
    spyOn(authentication, 'isAuthenticated').and.returnValue(false);

    expect(executeGuard(route, state)).toBeFalse();
  });

  it('should redirect to login uri when not authenticated', () => {
    spyOn(authentication, 'isAuthenticated').and.returnValue(false);

    executeGuard(route, state);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});
