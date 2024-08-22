import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie'
//import * as jwt_decode from 'jwt-decode'
import jwt_decode from 'jwt-decode'
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }


  public saveToken(token: string):void{
    var expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (24 * 60 * 60 * 1000));
   setCookie("token", token, { expires: expirationDate });
    localStorage.setItem("token", token);
  }

  public getToken(): string {





    const token = getCookie("token");
    const verifyToken1 = this.isLoggedIn();
    console.log("verify token", verifyToken1);
    if (token === undefined) {
        // Manejar el caso en el que la cookie no está presente
        const miValor:string= "false"
        return miValor;
    }

    const verifyToken = this.isLoggedIn();
    if(verifyToken==true){

      return token;
    }else{
      const miValor:string= "false";
      console.log("token no valido");
      this.deleteToken();
        return miValor;
    }

    
    
  }


  public validateToken(): Observable<boolean>{
    const token = getCookie("token");
    if(token==undefined || token == null){
      return of(false);
    }else{
      return of(true);
    }
  }

  public deleteToken():void{
    removeCookie("token");
    console.log("cookier removida")
  }


  isLoggedIn():boolean {
    const token = getCookie("token"); // Suponiendo que el token está almacenado en localStorage

   
    if (!token || token==undefined)  {
      return false;
    }

    let decodedToken = jwtDecode(token);


    if (decodedToken?.exp) {
      // Acceder a decodedToken.exp de forma segura
      const expirationDate = new Date(decodedToken.exp * 1000);
      console.log(expirationDate);
      const now = new Date();
      //return expirationDate.getTime() > now.getTime();

      if(expirationDate.getTime() > now.getTime())
      // ...
      return true
    } else {
      console.error('Token inválido o sin propiedad exp');
    }
     return false;
  }
}
