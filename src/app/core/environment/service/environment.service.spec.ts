import { TestBed } from '@angular/core/testing';

import { EnvironmentService } from './environment.service';
import { environment } from '@env/environment';

describe('EnvironmentService', () => {
  let service: EnvironmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvironmentService);
  });

  it('host should be equal to environment.host', () => {
    expect(service.host).toBe(environment.host);
  });

  it('openidClientId should be equal to environment.openidClientId', () => {
    expect(service.openidClientId).toBe(environment.openidClientId);
  });

  it('openidClientSecret should be equal to environment.openidClientSecret', () => {
    expect(service.openidClientSecret).toBe(environment.openidClientSecret);
  });

  it('authServerAuthorizeEndpointUri should be equal to environment.authServerAuthorizeEndpointUri', () => {
    expect(service.authServerAuthorizeEndpointUri).toBe(environment.authServerAuthorizeEndpointUri);
  });

  it('authServerTokenEndpointUri should be equal to environment.authServerTokenEndpointUri', () => {
    expect(service.authServerTokenEndpointUri).toBe(environment.authServerTokenEndpointUri);
  });
});
