import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { anonymousGuard } from './core/auth/guard/anonymous.guard';
import { authenticatedGuard } from './core/auth/guard/authenticated.guard';
import { BasePageComponent } from './root/component/base-page/base-page.component';
import { BasePublicPageComponent } from './root/component/base-public-page/base-public-page.component';

const routes: Routes = [
  { 
    path: 'login', 
    canActivate: [anonymousGuard],
    canActivateChild: [anonymousGuard],
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule) 
  },
  {
    path: 'home',
    component: BasePublicPageComponent,
    canActivate: [anonymousGuard],
    canActivateChild: [anonymousGuard],
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'dashboard',
    component: BasePageComponent,
    canActivate: [authenticatedGuard],
    canActivateChild: [authenticatedGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
