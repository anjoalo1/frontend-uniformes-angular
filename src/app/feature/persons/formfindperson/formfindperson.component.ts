import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FindcustomerService } from '../../../core/services/find/findcustomer.service';

@Component({
  selector: 'app-formfindperson',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  providers:[FindcustomerService],
  templateUrl: './formfindperson.component.html',
  styleUrl: './formfindperson.component.css'
})
export class FormfindpersonComponent {

  @Input() shoppinCar: any[]=[];

  /*[shoppinCar]="variable_padre"*/

  public findCustomer : FormGroup;
  detailsCustomer: any[]=[];
  messageCustomerNotFound:string="";
  booleanCustomerFound:boolean=false;
  customerId:number=0;
  aplicarEstilo1: boolean = true;
  

  constructor(private fb2: FormBuilder,private findCustomerService: FindcustomerService){

    this.findCustomer = this.fb2.group({
      cardId:['', [Validators.required]]
    });  
  }




  findCustomerForm(){
    console.log("hola mundo");
    this.findCustomerService.findCustomer(this.findCustomer.get('cardId')?.value).subscribe(
      {
        next:(res)=>{
          console.log(res);
          this.detailsCustomer=[];
          this.detailsCustomer.push(res.body);
          console.log(this.detailsCustomer);
          this.messageCustomerNotFound="Customer Found!"
          this.booleanCustomerFound=true;
          this.customerId = res.body.cardId;
        },
        error:(error)=>{console.log(error);
          this.messageCustomerNotFound="Customer not found";
          this.booleanCustomerFound=false;
        },
        complete:()=>{console.log("se completo la busqueda correctamente");}

      }
    
    )
  }







  formatearFechaCompleta2(fecha: Date): string {
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
    const dia = String(fecha.getDate()).padStart(2, '0');
    const hora = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');
    const segundos = String(fecha.getSeconds()).padStart(2, '0');
    const milisegundos = String(fecha.getMilliseconds()).padStart(3, '0');
    return `${anio}-${mes}-${dia}T${hora}:${minutos}:${segundos}.${milisegundos}`;
  }

  changeModal(){
    this.aplicarEstilo1 == true? this.aplicarEstilo1 = false : this.aplicarEstilo1 = true;
  }

  saveBillBD(customerId:number):void{
    console.log("customerId",customerId);
  }

}
