import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { of, throwError } from 'rxjs';

import { Oauth2Service } from './oauth2.service';
import { TokenResponse } from '../model/token-response';

describe('Oauth2Service', () => {
  let service: Oauth2Service;
  let http: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(Oauth2Service);
    http = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('makeAuthorizeUrl()', () => {
    it('should match auth server authorize endpoint', () => {
      const exp = new RegExp(`^http://auth.example.com/oauth2/authorize`);
      expect(service.makeAuthorizeUrl(
        'http://auth.example.com/oauth2/authorize',
        'challenge',
        'example-app',
        'http://app.example.com/login/oauth2/code'
      )).toMatch(exp);
    });

    it('should contain query string params', () => {
      const actualAuthorizeUrl: string = service.makeAuthorizeUrl(
        'http://auth.example.com/oauth2/authorize',
        'challenge',
        'example-app',
        'http://app.example.com/login/oauth2/code'
      );

      expect(actualAuthorizeUrl).toContain('response_type=code');
      expect(actualAuthorizeUrl).toContain('client_id=example-app');
      expect(actualAuthorizeUrl).toContain(`redirect_uri=${encodeURIComponent('http://app.example.com/login/oauth2/code')}`);
      expect(actualAuthorizeUrl).toContain('scope=openid');
      expect(actualAuthorizeUrl).toContain('code_challenge_method=S256');
      expect(actualAuthorizeUrl).toContain('code_challenge=challenge');
    });
  });

  describe('token()', () => {
    it('should call auth server token endpoint', () => {
      service.token(
        'http://auth.mock.com/oauth2/token',
        'authorization',
        'http://www.mock.com/login/oauth2/code',
        'example-app',
        'secret',
        'verifier'
      ).subscribe();

      const req = httpTestingController.expectOne('http://auth.mock.com/oauth2/token');

      expect(req.request.method).toEqual('POST');

      const actualRequestBody: string = req.request.body.toString();

      expect(actualRequestBody).toContain('grant_type=authorization_code');
      expect(actualRequestBody).toContain('code=authorization');
      expect(actualRequestBody).toContain('redirect_uri=http://www.mock.com/login/oauth2/code');
      expect(actualRequestBody).toContain('client_id=example-app');
      expect(actualRequestBody).toContain('client_secret=secret');
      expect(actualRequestBody).toContain('code_verifier=verifier');

      httpTestingController.verify();
    });

    it('should return token on success', (done: DoneFn) => {
      spyOn(http, 'post').and.returnValue(of({ 'access_token': 'access' }));

      service.token(
        'http://auth.mock.com/oauth2/token',
        'authorization',
        'http://www.mock.com/login/oauth2/code',
        'example-app',
        'secret',
        'verifier'
      ).subscribe((response: TokenResponse) => {
        expect(response.accessToken).toBe('access');

        done();
      });
    });

    it('should throw error on http client error', (done: DoneFn) => {
      spyOn(http, 'post').and.callFake(() => throwError(() => new HttpErrorResponse({ error: 'mock error', status: 500 })));

      service.token(
        'http://auth.mock.com/oauth2/token',
        'authorization',
        'http://www.mock.com/login/oauth2/code',
        'example-app',
        'secret',
        'verifier'
      ).subscribe({
        error: (error: Error) => {
          expect(error).toBeTruthy();

          done();
        },
      });
    });
  });
});
