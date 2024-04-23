import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppBaseComponent } from '../../../../core/utils/AppBaseComponent';
import { AuthService } from '../../../../core/services/auth.service';
import { authAdmin } from '../../../../core/dto/authDto';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
  providers:[AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent extends AppBaseComponent{


  public login: FormGroup;


  constructor (private fb: FormBuilder, private authservice: AuthService){
    super();

    this.login = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(5), Validators.max(30)]]
   });


   this.login.valueChanges.subscribe(() => {
    // Verificamos si el control está inválido y si se ha tocado (es decir, se ha enfocado y luego perdido el foco)
    if (this.login.invalid && this.login.touched) {
      // Si el correo electrónico no es válido, mostramos un mensaje específico
      console.log('fasdfasdfasdf');

      if(this.login.get('email')?.invalid){
        console.log("no es un correo valido")
      }
    }
  });


  }




  public getErrorsForms(field:string):string{
    console.log("getErrorsForms");
    console.log(this.login.get(field)?.errors); // Devuelve las validaciones del campo 'fieldName'
    let message:string="";

    if(this.isTouchedField(this.login, field)){
      if(this.login.get(field)?.hasError('required') || this.login.get(field)?.hasError('email')){
        message="Es requerido";
      }
    }

    return message;
  }

  sedLogin(form: FormGroup): void{
    console.log(form.value);
  }

  public signIn():void{
    
    let email = this.login.get('email')?.value;
    let password = this.login.get('password')?.value;

    let dtoLogin:authAdmin={
      "email":email,
      "password":password
    }

    this.authservice.login(dtoLogin).subscribe(
      value=>{
        console.log(value);
      }
    )

   
  }

 

}
