import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { of, switchMap } from 'rxjs';

import { Oauth2Service } from '@app/login/service/oauth2.service';
import { ConfigService } from '@app/core/config/service/config.service';
import { TokenResponse } from '@app/login/model/token-response';
import { LocalStorageRefService } from '@app/core/window/service/local-storage-ref.service';
import { SessionStorageRefService } from '@app/core/window/service/session-storage-ref.service';
import { MessageService } from '@app/core/message/service/message.service';
import { MessageType } from '@app/core/message/model/message.model';
import { EnvironmentService } from '@app/core/environment/service/environment.service';

@Component({
  selector: 'app-oauth2-authorization-code-callback',
  templateUrl: './oauth2-authorization-code-callback.component.html',
  styleUrls: ['./oauth2-authorization-code-callback.component.css']
})
export class Oauth2AuthorizationCodeCallbackComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private config: ConfigService,
    private environment: EnvironmentService,
    private oauth2: Oauth2Service,
    private message: MessageService,
    private sessionStorageRef: SessionStorageRefService,
    private localStorageRef: LocalStorageRefService
  ) { }

  ngOnInit(): void {
    const verifier: string | null = this.sessionStorageRef.nativeSessionStorage.getItem('code_verifier');
    this.sessionStorageRef.nativeSessionStorage.removeItem('code_verifier');

    if (!verifier) {
      this.router.navigateByUrl('/');

      return;
    }

    this.route.queryParams
      .pipe(
        switchMap((params: Params) => {
          const code: string | null = params['code'];

          if (!code) {
            return of(null);
          }

          return this.oauth2.token(
            this.environment.authServerTokenEndpointUri,
            code,
            this.environment.host + this.config.oauth2CodeCallbackUri,
            this.environment.openidClientId,
            this.environment.openidClientSecret,
            verifier
          );
        })
      )
      .subscribe({
        next: (response: TokenResponse | null) => {
          if (response) {
            this.localStorageRef.nativeLocalStorage.setItem('access_token', response.accessToken);
            this.router.navigateByUrl(this.config.loginSuccessRedirectUri);
          } else {
            this.router.navigateByUrl('/');
          }
        },
        error: (error: Error) => {
          this.localStorageRef.nativeLocalStorage.removeItem('access_token');
          this.message.send(error.message, MessageType.Error);
        }
      });
  }
}
