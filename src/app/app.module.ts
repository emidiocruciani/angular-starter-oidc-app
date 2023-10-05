import { NgModule } from '@angular/core';

import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';
import { RootModule } from '@app/root/root.module';
import { AppRootComponent } from '@app/root/component/app-root/app-root.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CoreModule,
    SharedModule,
    RootModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppRootComponent]
})
export class AppModule { }
