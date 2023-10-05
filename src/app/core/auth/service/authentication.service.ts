import { Injectable } from '@angular/core';

import { LocalStorageRefService } from '@app/core/window/service/local-storage-ref.service';

@Injectable({ 
  providedIn: 'root',
})
export class AuthenticationService {

  constructor(private localStorageRef: LocalStorageRefService) {}

  public isAuthenticated(): boolean {
    return !!this.localStorageRef.nativeLocalStorage.getItem('access_token');
  }
}
