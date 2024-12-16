import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './user.service';

export const userGuard: CanActivateFn = async (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const isAuthenticated = await userService.isAuthenticated(); // Llama a un método asíncrono
  if (isAuthenticated) {
    return true;
  } else {
    await router.navigate(['login']);
    return false;
  }
};

export const adminGuard: CanActivateFn = async (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const isAdmin = await userService.isAdmin(); // Llama a un método asíncrono
  if (isAdmin) {
    return true;
  } else {
    await router.navigate(['login']);
    return false;
  }
};
