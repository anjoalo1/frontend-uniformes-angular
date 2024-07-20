import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token/token.service';

export const loginauthGuard: CanActivateFn = (route, state) => {


  const auhtService = inject(TokenService)
  const router = inject(Router);

  if(auhtService.getToken()=="false"){
    router.navigateByUrl('/login');
    
    console.log("no puedes entrar");

    return false;
  }else{

   /*  console.log("si puedes entrar");
    router.navigateByUrl("/catalogue"); */
    return true;
  }
};
