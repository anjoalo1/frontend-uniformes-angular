import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FindcustomerService {

  private token:string="";
  private url:string='http://localhost:8086/customer/id/';

  constructor(private http: HttpClient) { }


  findCustomer(id:number):Observable<any>{
    console.log(`${this.url}${id}`);
    return this.http.get(`${this.url}${id}`, {observe:'response'});
  }
}
