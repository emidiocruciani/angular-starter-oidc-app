import { Injectable } from '@angular/core';

import { Buffer } from 'buffer';
import { Observable, from, of, switchMap } from 'rxjs';

import { Pkce } from '../model/pkce';

@Injectable({
  providedIn: 'root'
})
export class PkceFactoryService {

  public make(): Observable<Pkce> {
    const verifier: string = this.makeVerifier();

    const challenge$ = this.makeChallenge(verifier);

    return challenge$.pipe(
      switchMap((challenge: string) =>
        of(new Pkce(verifier, challenge))
      )
    );
  }

  public validate(verifier: string, challenge: string): Observable<boolean> {
    const expectedChallenge$ = this.makeChallenge(verifier);

    return expectedChallenge$.pipe(
      switchMap((expectedChallenge: string) =>
        of(expectedChallenge === challenge)
      )
    );
  }

  private makeChallenge(verifier: string): Observable<string> {
    const verifierBytes = new TextEncoder().encode(verifier);

    const digest$ = from(crypto.subtle.digest(
      'SHA-256',
      verifierBytes
    ));

    return digest$.pipe(
      switchMap((digest: ArrayBuffer) =>
        of(
          Buffer.from(digest)
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '')
        )
      )
    );
  }

  private makeVerifier(): string {
    const octetCount: number = 36 + Math.ceil(Math.random() * 10) * 6;
    const hexes: Uint16Array = crypto.getRandomValues(new Uint16Array(octetCount / 2));

    return Buffer.from(hexes)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }
}
