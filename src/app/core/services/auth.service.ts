import { Injectable } from '@angular/core';
import { authAdmin } from '../dto/authDto';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, tap } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { TokenDto } from '../dto/tokenDto';
import { TokenService } from './token/token.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  url:string="http://localhost:8086/auth/sign-in"

  constructor(private http: HttpClient, private tokenService: TokenService) { }


 /*  public login(authDto: authAdmin): Subscription{

    return this.http.post(this.url, authDto).subscribe({
      next:(value: any)=>{
        console.log(value);
      },
      error:(err: any) =>{
        console.log(err);
      }
    });

  } */


  public login(authDto: authAdmin): Observable<TokenDto>{

     return this.http.post<TokenDto>(this.url, authDto).pipe(

      tap(response=>{
        this.tokenService.saveToken(response.token);
      }

      )
     )

  }



}
