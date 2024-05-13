import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  switch (state.url) {
    case '/login':
      if (authService.isLoggedIn()) {
        router.navigateByUrl(`/dashboard`);
        return false;
      }
      break;
    case '/register':
      if (authService.isLoggedIn()) {
        router.navigateByUrl(`/dashboard`);
        return false;
      }
      break;
    case '/addtask':
      if (authService.isLoggedIn()) {
        return true;
      } else {
        router.navigateByUrl('/');
      }
      break;
    case '/dashboard':
      if (authService.isLoggedIn()) {
        return true;
      } else {
        router.navigateByUrl('/');
      }
      break;
  }

  return true;
};
