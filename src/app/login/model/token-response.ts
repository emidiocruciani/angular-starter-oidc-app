export class TokenResponse {

  constructor(private _accessToken: string) { }

  public get accessToken(): string {
    return this._accessToken;
  }
}
