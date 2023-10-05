import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Observable, of, throwError } from "rxjs";

import { MessageService } from "@app/core/message/service/message.service";
import { LocalStorageRefService } from "@app/core/window/service/local-storage-ref.service";
import { SessionStorageRefService } from "@app/core/window/service/session-storage-ref.service";
import { Oauth2Service } from "@app/login/service/oauth2.service";
import { Oauth2AuthorizationCodeCallbackComponent } from "./oauth2-authorization-code-callback.component";
import { TokenResponse } from "@app/login/model/token-response";
import { MessageType } from "@app/core/message/model/message.model";
import { oauth2StubFactory } from "@app/login/testing/mock-factories-registry.spec";
import { ConfigService } from "@app/core/config/service/config.service";
import { EnvironmentService } from "@app/core/environment/service/environment.service";
import { activatedRouteStubFactory, configStubFactory, environmentStubFactory, localStorageRefStubFactory, messengerStubFactory, routerStubFactory, sessionStorageRefStubFactory } from "@app/core/testing/mock-factories-registry.spec";

describe('Oauth2AuthorizationCodeCallbackComponent', () => {

  let component: Oauth2AuthorizationCodeCallbackComponent;
  let fixture: ComponentFixture<Oauth2AuthorizationCodeCallbackComponent>;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let config: ConfigService;
  let environment: EnvironmentService;
  let oauth2: Oauth2Service;
  let messenger: MessageService;
  let localStorageRef: LocalStorageRefService;
  let sessionStorageRef: SessionStorageRefService;

  const setupTestingScenario = (verifier: string | null, queryParams: Observable<Params>, tokenResponse: Observable<TokenResponse>) => {
    if (null !== verifier) {
      sessionStorageRef.nativeSessionStorage.setItem('code_verifier', verifier);
    }

    sessionStorageRef.nativeSessionStorage.setItem('not_code_verifier', 'not_verifier');
    activatedRoute.queryParams = queryParams;

    spyOnProperty(config, 'loginSuccessRedirectUri', 'get').and.returnValue('/login-success');
    spyOnProperty(config, 'oauth2CodeCallbackUri', 'get').and.returnValue('/login/oauth2/code');
    spyOnProperty(environment, 'host', 'get').and.returnValue('http://app.example.com');
    spyOnProperty(environment, 'authServerTokenEndpointUri', 'get').and.returnValue('http://auth.example.com/oauth2/token');
    spyOnProperty(environment, 'openidClientId', 'get').and.returnValue('example-app');
    spyOnProperty(environment, 'openidClientSecret', 'get').and.returnValue('secret');
    spyOn(router, 'navigateByUrl').and.callThrough();
    spyOn(messenger, 'send').and.callThrough();
    spyOn(oauth2, 'token').and.returnValue(tokenResponse);

    fixture = TestBed.createComponent(Oauth2AuthorizationCodeCallbackComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useFactory: routerStubFactory },
        { provide: ActivatedRoute, useFactory: activatedRouteStubFactory },
        { provide: ConfigService, useFactory: configStubFactory },
        { provide: EnvironmentService, useFactory: environmentStubFactory },
        { provide: Oauth2Service, useFactory: oauth2StubFactory },
        { provide: MessageService, useFactory: messengerStubFactory },
        { provide: LocalStorageRefService, useFactory: localStorageRefStubFactory },
        { provide: SessionStorageRefService, useFactory: sessionStorageRefStubFactory },
      ]
    });

    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    config = TestBed.inject(ConfigService);
    environment = TestBed.inject(EnvironmentService);
    oauth2 = TestBed.inject(Oauth2Service);
    messenger = TestBed.inject(MessageService);
    localStorageRef = TestBed.inject(LocalStorageRefService);
    sessionStorageRef = TestBed.inject(SessionStorageRefService);
  });

  describe('component creation', () => {

    it('should create', async () => {
      setupTestingScenario('verifier', of({ 'code': 'authorization' }), of(new TokenResponse('access')));

      await fixture.whenStable();
      expect(component).toBeTruthy();
    });
  });

  describe('on successful authorization', () => {

    beforeEach(async () => {
      setupTestingScenario('verifier', of({ 'code': 'authorization' }), of(new TokenResponse('access')));
      await fixture.whenStable();
    });

    it('should remove code verifier from session storage', () => {
      expect(sessionStorageRef.nativeSessionStorage.getItem('code_verifier'))
        .toBeNull();
    });

    it('should not remove other variables from session storage', () => {
      expect(sessionStorageRef.nativeSessionStorage.getItem('not_code_verifier'))
        .toBe('not_verifier');
    });

    it('should call auth server token endpoint', () => {
      expect(oauth2.token)
        .withContext('with verifier from session storage and code from query string')
        .toHaveBeenCalledOnceWith(
          'http://auth.example.com/oauth2/token',
          'authorization',
          'http://app.example.com/login/oauth2/code',
          'example-app',
          'secret',
          'verifier'
        );
    });

    it('should store access token in local storage', () => {
      expect(localStorageRef.nativeLocalStorage.getItem('access_token'))
        .toBe('access');
    });

    it('should navigate to success uri', () => {
      expect(router.navigateByUrl)
        .toHaveBeenCalledOnceWith('/login-success');
    });
  });

  describe('when missing code from query string', () => {

    beforeEach(async () => {
      setupTestingScenario('verifier', of({ 'not-code': 'authorization' }), of(new TokenResponse('access')));
      await fixture.whenStable();
    });

    it('should remove code verifier from session storage', () => {
      expect(sessionStorageRef.nativeSessionStorage.getItem('code_verifier'))
        .toBeNull();
    });

    it('should not remove other variables from session storage', () => {
      expect(sessionStorageRef.nativeSessionStorage.getItem('not_code_verifier'))
        .toBe('not_verifier');
    });

    it('should not call auth server token endpoint', () => {
      expect(oauth2.token)
        .toHaveBeenCalledTimes(0);
    });

    it('should navigate to root page', () => {
      expect(router.navigateByUrl)
        .toHaveBeenCalledOnceWith('/');
    });
  });

  describe('when missing code verifier from session storage', () => {

    beforeEach(async () => {
      setupTestingScenario(null, of({ 'code': 'authorization' }), of(new TokenResponse('access')));
      await fixture.whenStable();
    });

    it('should not remove other variables from session storage', () => {
      expect(sessionStorageRef.nativeSessionStorage.getItem('not_code_verifier'))
        .toBe('not_verifier');
    });

    it('should not call auth server token endpoint', () => {
      expect(oauth2.token)
        .toHaveBeenCalledTimes(0);
    });

    it('should navigate to root page', () => {
      expect(router.navigateByUrl)
        .toHaveBeenCalledOnceWith('/');
    });
  });

  describe('when auth server token endpoint call throws an error', () => {

    beforeEach(async () => {
      setupTestingScenario('verifier', of({ 'code': 'authorization' }), throwError(() => new Error('api server error')));
      await fixture.whenStable();
    });

    it('should remove code verifier from session storage', () => {
      expect(sessionStorageRef.nativeSessionStorage.getItem('code_verifier'))
        .toBeNull();
    });

    it('should not remove other variables from session storage', () => {
      expect(sessionStorageRef.nativeSessionStorage.getItem('not_code_verifier'))
        .toBe('not_verifier');
    });

    it('should send the error message', () => {
      expect(messenger.send)
        .toHaveBeenCalledOnceWith('api server error', MessageType.Error);
    });
  });
});
