export class Pkce {

  constructor(private _verifier: string, private _challenge: string) { }

  public get verifier(): string {
    return this._verifier;
  }

  public get challenge(): string {
    return this._challenge;
  }
}
