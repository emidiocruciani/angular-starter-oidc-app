import { Router, CanActivateChildFn } from '@angular/router';
import { inject } from '@angular/core';

import { ConfigService } from '@app/core/config/service/config.service';
import { AuthenticationService } from '../service/authentication.service';

export const authenticatedGuard: CanActivateChildFn = () => {
  const authentication = inject(AuthenticationService);
  const config = inject(ConfigService);
  
  if (!authentication.isAuthenticated()) {
    const router = inject(Router);
    router.navigateByUrl(config.loginUri);

    return false;
  }

  return true;
};
