import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateillService {


  private token:string="";
  private url:string='http://localhost:8086/bill';

  constructor(private http: HttpClient) { }


  createBill(myObjecto:any):void{

    const headers = { 
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      'Content-Type': 'application/json'
    
    };
    this.http.post(this.url, myObjecto, {headers}).subscribe(res=>(console.log(res)));
  }
}
