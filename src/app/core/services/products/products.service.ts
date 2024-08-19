import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SendtokenserviceService } from '../sendtoken/sendtokenservice.service';
import { TokenService } from '../token/token.service';
/* 
import { KJUR, JWS } from 'jsrsasign'; */




@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  myToken = inject(TokenService);
  token:string="";

  constructor(private http: HttpClient) { }

  private url:string='http://localhost:8086/products';

  loadProdudcts():Observable<any>{
    this.token = this.myToken.getToken();
    const myHeader=new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
   /*  const verifyToken = this.isTokenExpired(this.token); */
  /*   console.log(verifyToken); */
    return this.http.get(this.url, {headers:myHeader});
  }

/* 

  // Método para verificar si el token ha expirado
  isTokenExpired(token: string): boolean {
    const decoded = JWS.parse(token); // Decodificar el token
    const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos

    // Verificar la propiedad 'exp'
    if (decoded.payloadObj.exp) {
      return decoded.payloadObj.exp < currentTime; // Retorna true si ha expirado
    }
    return false; // Si no hay 'exp', consideramos que no ha expirado
  }

  // Método para validar el token
  validateToken(token: string): void {
    try {
      const isExpired = this.isTokenExpired(token);
      if (isExpired) {
        console.log('El token ha expirado.');
      } else {
        console.log('El token es válido y no ha expirado.');
      }
    } catch (error) {
      console.log('Error al validar el token:');
    }
  } */

}
