import { Injectable } from '@angular/core';
import { getCookie, setCookie } from 'typescript-cookie'

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
        throw new Error("Token no encontrado en las cookies.");
    }
    return token;
    
  }

  public deleteToken():void{

  }
}
