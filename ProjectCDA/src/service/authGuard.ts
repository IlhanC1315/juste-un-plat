import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from './auth';

export const authGard: CanActivateFn = () => {
  const authService = inject(Auth);
  const router = inject(Router);

  // Comme isLoggedIn est un signal, on l'appelle avec ()
  if (authService.isLoggedIn()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};





