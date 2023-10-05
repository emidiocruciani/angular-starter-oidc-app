import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ConfigService } from '@app/core/config/service/config.service';
import { LocalStorageRefService } from '@app/core/window/service/local-storage-ref.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private router: Router,
    private config: ConfigService,
    private localStorageRef: LocalStorageRefService
  ) { }

  public logout(): void {
    this.localStorageRef.nativeLocalStorage.removeItem('access_token');

    this.router.navigateByUrl(this.config.logoutRedirectUri);
  }
}
