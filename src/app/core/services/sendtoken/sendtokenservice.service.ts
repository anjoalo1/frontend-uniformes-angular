import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendtokenserviceService {

  constructor(private getToken: TokenService, private http: HttpClient) { }

  private token:string="";
  private url:string='http://localhost:8086/products';

  private urlBill:string ='http://localhost:8086/bill';
  
  private httpHeaders!:HttpHeaders; 
  
 /*  const token = 'tu_token_aqui'; // Aquí debes obtener el token de donde lo tengas almacenado en tu aplicación
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + token}); */

    private getHeadersWithToken(): HttpHeaders {
      this.token=this.getToken.getToken();
      return new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
      });
    }

   

   /*  showToken():void{
      this.token=this.getToken.getToken();
    } */

    sendHeader():Observable<any>{
      this.httpHeaders = this.getHeadersWithToken();
     return  this.http.get(this.url, {headers:this.httpHeaders});
    }


    sendHeader2():Observable<any>{
      //this.httpHeaders = this.getHeadersWithToken();
     return  this.http.get(this.url);
    }



    sendPostBill(body:any):void{

      let token = this.getToken.getToken();
      const headers = { 
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      
      };
      ///const headers = this.getHeadersWithToken();
      console.log(headers, body);
       this.http.post(this.urlBill, body,  {headers}).subscribe(res=>{console.log(res)});
    }







}
