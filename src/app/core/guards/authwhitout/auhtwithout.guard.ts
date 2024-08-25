import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../../services/token/token.service';

export const auhtwithoutGuard: CanActivateFn = (route, state) => {
  const auhtService = inject(TokenService)
  const router = inject(Router);




  console.log(route);

  if(auhtService.getToken()=="false"){

    return true;
  }

  




  router.navigateByUrl('/catalogue');
  return false;
};