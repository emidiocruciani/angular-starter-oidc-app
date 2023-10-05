import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Oauth2AuthorizationCodeCallbackComponent } from './component/oauth2-authorization-code-callback/oauth2-authorization-code-callback.component';
import { LoginComponent } from './component/login/login.component';

const routes: Routes = [
  {
    path: 'oauth2/code',
    component: Oauth2AuthorizationCodeCallbackComponent
  },
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
