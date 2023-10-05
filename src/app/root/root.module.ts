import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { ToastrModule } from 'ngx-toastr';

import { CoreModule } from '@app/core/core.module';
import { AppRootComponent } from './component/app-root/app-root.component';
import { PublicNavbarComponent } from './component/public-navbar/public-navbar.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { BasePageComponent } from './component/base-page/base-page.component';
import { BasePublicPageComponent } from './component/base-public-page/base-public-page.component';

@NgModule({
  declarations: [
    AppRootComponent,
    PublicNavbarComponent,
    NavbarComponent,
    BasePageComponent,
    BasePublicPageComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      extendedTimeOut: 1000,
      positionClass: 'toast-bottom-center',
    }),
    CoreModule,
  ],
  exports: [
    AppRootComponent,
  ],
})
export class RootModule { }
