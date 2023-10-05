/* eslint-disable @typescript-eslint/no-unused-vars */
import { of, Observable } from "rxjs";

import { TokenResponse } from "../model/token-response";
import { Oauth2Service } from "../service/oauth2.service";
import { PkceFactoryService } from "../service/pkce-factory.service";
import { Pkce } from "../model/pkce";

export const oauth2StubFactory = () => {
  return {
    makeAuthorizeUrl(
      authServerAuthorizeEndpointUri: string,
      challenge: string,
      clientId: string,
      redirectUri: string
    ): string {

      return '';
    },
    token(authServerAuthorizeEndpointUri: string,
      authorizationCode: string,
      redirectUri: string,
      clientId: string,
      clientSecret: string,
      verifier: string
    ): Observable<TokenResponse> {

      return of(new TokenResponse(''));
    }
  } as Oauth2Service;
};

export const pkceFactoryStubFactory = () => {
  return {
    make(): Observable<Pkce> {
      return of(new Pkce('', ''));
    }
  } as PkceFactoryService;
};
