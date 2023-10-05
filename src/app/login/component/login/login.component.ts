import { Component, OnInit } from '@angular/core';

import { ConfigService } from '@app/core/config/service/config.service';
import { EnvironmentService } from '@app/core/environment/service/environment.service';
import { SessionStorageRefService } from '@app/core/window/service/session-storage-ref.service';
import { WindowRefService } from '@app/core/window/service/window-ref.service';
import { Pkce } from '@app/login/model/pkce';
import { Oauth2Service } from '@app/login/service/oauth2.service';
import { PkceFactoryService } from '@app/login/service/pkce-factory.service';

@Component({
  selector: 'app-login',
  template: '',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(
    private windowRef: WindowRefService,
    private sessionStorageRef: SessionStorageRefService,
    private config: ConfigService,
    private environment: EnvironmentService,
    private oauth2: Oauth2Service,
    private pkceFactory: PkceFactoryService
  ) { }

  ngOnInit(): void {
    this.sessionStorageRef.nativeSessionStorage.removeItem('code_verifier');

    this.pkceFactory.make().subscribe((pkce: Pkce) => {
      this.sessionStorageRef.nativeSessionStorage.setItem('code_verifier', pkce.verifier);

      const authorizationUrl = this.oauth2.makeAuthorizeUrl(
        this.environment.authServerAuthorizeEndpointUri,
        pkce.challenge,
        this.environment.openidClientId,
        this.environment.host + this.config.oauth2CodeCallbackUri
      );

      this.windowRef.nativeWindow.location.href = authorizationUrl;
    });
  }
}
