import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { Oauth2AuthorizationCodeCallbackComponent } from './component/oauth2-authorization-code-callback/oauth2-authorization-code-callback.component';
import { LoginComponent } from './component/login/login.component';

@NgModule({
  declarations: [
    Oauth2AuthorizationCodeCallbackComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
  ]
})
export class LoginModule { }
