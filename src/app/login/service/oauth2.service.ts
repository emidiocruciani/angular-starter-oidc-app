import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, catchError, of, switchMap, throwError } from 'rxjs';

import { TokenResponseDto } from '../dto/token-response-dto';
import { TokenResponse } from '../model/token-response';

@Injectable({
  providedIn: 'root'
})
export class Oauth2Service {

  constructor(private http: HttpClient) { }

  public makeAuthorizeUrl(
    authServerAuthorizeEndpointUri: string,
    challenge: string,
    clientId: string,
    redirectUri: string
  ): string {

    return authServerAuthorizeEndpointUri +
      '?response_type=code' +
      `&client_id=${clientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      '&scope=openid' +
      '&code_challenge_method=S256' +
      `&code_challenge=${challenge}`;
  }

  public token(
    authServerAuthorizeEndpointUri: string,
    authorizationCode: string,
    redirectUri: string,
    clientId: string,
    clientSecret: string,
    verifier: string
  ): Observable<TokenResponse> {

    const httpRequestBody = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', authorizationCode)
      .set('redirect_uri', redirectUri)
      .set('client_id', clientId)
      .set('client_secret', clientSecret)
      .set('code_verifier', verifier);

    return this.http
      .post<TokenResponseDto>(
        authServerAuthorizeEndpointUri,
        httpRequestBody,
        {
          headers: {
            'accept': 'application/json',
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded'
          }
        }
      )
      .pipe(
        catchError((error: HttpErrorResponse) =>
          throwError(() => new Error(error.message))
        ),
        switchMap((dto: TokenResponseDto) =>
          of(new TokenResponse(dto.access_token))
        )
      );
  }
}
