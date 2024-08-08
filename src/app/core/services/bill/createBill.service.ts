import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateiBllService {


  private token:string="";
  private url:string='http://localhost:8086/bill';

  constructor(private http: HttpClient) { }


  createBill(myObjecto:any):Observable<any>{

    const headers = { 
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      'Content-Type': 'application/json'
    
    };
    return this.http.post(this.url, myObjecto, {headers});
  }
}
