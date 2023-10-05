import { Injectable } from '@angular/core';

import { environment } from '@env/environment';

@Injectable({ 
  providedIn: 'root',
})
export class EnvironmentService {

  public get host(): string {
    return environment.host;
  }

  public get openidClientId(): string {
    return environment.openidClientId;
  }

  public get openidClientSecret(): string {
    return environment.openidClientSecret;
  }

  public get authServerAuthorizeEndpointUri(): string {
    return environment.authServerAuthorizeEndpointUri;
  }

  public get authServerTokenEndpointUri(): string {
    return environment.authServerTokenEndpointUri;
  }
}
