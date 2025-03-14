import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@shared/service/auth.service';

export const RoleAdminCheckGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const admin = authService.getIsAdmin();
  if (admin) {
    return true;
  }

  router.navigate(['/']);
  return false;
};
