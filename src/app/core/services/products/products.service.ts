import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  private url:string='http://localhost:8086/products';

  loadProdudcts():Observable<any>{

    return this.http.get(this.url);
  }
}
