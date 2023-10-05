import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { of } from 'rxjs';

import { LoginComponent } from './login.component';
import { PkceFactoryService } from '@app/login/service/pkce-factory.service';
import { Pkce } from '@app/login/model/pkce';
import { Oauth2Service } from '@app/login/service/oauth2.service';
import { WindowRefService } from '@app/core/window/service/window-ref.service';
import { SessionStorageRefService } from '@app/core/window/service/session-storage-ref.service';
import { oauth2StubFactory, pkceFactoryStubFactory } from '@app/login/testing/mock-factories-registry.spec';
import { ConfigService } from '@app/core/config/service/config.service';
import { EnvironmentService } from '@app/core/environment/service/environment.service';
import { configStubFactory, environmentStubFactory, sessionStorageRefStubFactory, windowRefStubFactory } from '@app/core/testing/mock-factories-registry.spec';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let oauth2: Oauth2Service;
  let pkceFactory: PkceFactoryService;
  let windowRef: WindowRefService;
  let sessionStorageRef: SessionStorageRefService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [LoginComponent],
      providers: [
        { provide: ConfigService, useFactory: configStubFactory },
        { provide: EnvironmentService, useFactory: environmentStubFactory },
        { provide: Oauth2Service, useFactory: oauth2StubFactory },
        { provide: PkceFactoryService, useFactory: pkceFactoryStubFactory },
        { provide: SessionStorageRefService, useFactory: sessionStorageRefStubFactory },
        { provide: WindowRefService, useFactory: windowRefStubFactory },
      ],
    });

    oauth2 = TestBed.inject(Oauth2Service);
    pkceFactory = TestBed.inject(PkceFactoryService);
    windowRef = TestBed.inject(WindowRefService);
    sessionStorageRef = TestBed.inject(SessionStorageRefService);

    sessionStorageRef.nativeSessionStorage.clear();

    spyOn(pkceFactory, 'make').and.returnValue(of(new Pkce('verifier', 'challenge')));
    spyOn(oauth2, 'makeAuthorizeUrl').and.returnValue('auth-server-authorization-url.com');
    spyOnProperty(windowRef.nativeWindow.location, 'href', 'get').and.callThrough();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to auth server authorize endpoint', () => {
    expect(windowRef.nativeWindow.location.href).toBe('auth-server-authorization-url.com');
  });

  it('should store oauth2 code verifier in session storage', () => {
    expect(sessionStorageRef.nativeSessionStorage.getItem('code_verifier')).toBe('verifier');
  });
});
