import { Router, CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';

import { ConfigService } from '@app/core/config/service/config.service';
import { AuthenticationService } from '../service/authentication.service';

export const anonymousGuard: CanActivateFn = () => {
  const authentication = inject(AuthenticationService);
  const config = inject(ConfigService);
  
  if (authentication.isAuthenticated()) {
    const router = inject(Router);
    router.navigateByUrl(config.loginSuccessRedirectUri);

    return false;
  }

  return true;
};
