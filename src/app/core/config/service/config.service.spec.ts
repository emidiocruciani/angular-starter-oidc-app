import { TestBed } from '@angular/core/testing';

import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigService);
  });

  it('loginUri should be set', () => {
    expect(service.loginUri).toBeTruthy();
  });

  it('loginSuccessRedirectUri should be set', () => {
    expect(service.loginSuccessRedirectUri).toBeTruthy();
  });

  it('logoutRedirectUri should be set', () => {
    expect(service.logoutRedirectUri).toBeTruthy();
  });
  
  it('oauth2CodeCallbackUri should be set', () => {
    expect(service.oauth2CodeCallbackUri).toBeTruthy();
  });
});
