import { CanActivateFn } from '@angular/router';

export const loginauthGuard: CanActivateFn = (route, state) => {
  return true;
};
