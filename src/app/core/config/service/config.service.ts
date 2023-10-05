import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() {}

  public get loginUri(): string {
    return '/login';
  }

  public get loginSuccessRedirectUri(): string {
    return '/dashboard';
  }

  public get logoutRedirectUri(): string {
    return '/home'; 
  }

  public get oauth2CodeCallbackUri(): string {
    return '/login/oauth2/code';
  }
}
