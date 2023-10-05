import { Injectable } from '@angular/core';

function getSessionStorage(): Storage {
  return sessionStorage;
}

@Injectable({
  providedIn: 'root'
})
export class SessionStorageRefService {

  public get nativeSessionStorage(): Storage {
    return getSessionStorage();
  }
}
