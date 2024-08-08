import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie'

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
    if (token === undefined) {
        // Manejar el caso en el que la cookie no está presente
        const miValor:string= "false"
        return miValor;
    }
    return token;
    
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
}
