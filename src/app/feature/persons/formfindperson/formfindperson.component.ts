import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FindcustomerService } from '../../../core/services/find/findcustomer.service';
import { CreateiBllService } from '../../../core/services/bill/createBill.service';
import { BillDetailsService } from '../../../core/services/bill_details/bill-details.service';
import { CarshopService } from '../../../core/services/carshop/carshop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formfindperson',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  providers:[FindcustomerService, CreateiBllService, BillDetailsService],
  templateUrl: './formfindperson.component.html',
  styleUrl: './formfindperson.component.css'
})
export class FormfindpersonComponent {

  shoppinCar: any[]=[];

  /*[shoppinCar]="variable_padre"*/

  public findCustomer : FormGroup;
  detailsCustomer: any[]=[];
  messageCustomerNotFound:string="";
  booleanCustomerFound:boolean=false;
  customerId:number=0;
  aplicarEstilo1: boolean = true;
  completeBuySave:boolean = false;

  private carshopService = inject(CarshopService);
  

  constructor(private fb2: FormBuilder,private findCustomerService: FindcustomerService,
     private createBill:CreateiBllService, private createBillDetails: BillDetailsService,
     private router: Router){

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
          this.carshopService.items.subscribe(datos=>{
            console.log(datos);
            this.shoppinCar = datos;
            /* this.sumarTotal(); */
          })
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


  //metodo para guardar 
  saveBillBD(customerId:number):void{
    console.log("customerId",customerId);

    let dateBill = this.formatearFechaCompleta2(new Date());
    let bill:any = {id:dateBill, billDate:dateBill,customerId:customerId};
    console.log(bill);
    this.createBill.createBill(bill).subscribe({
      next:(res)=>{
        console.log(res);
        const copyItems  =[...this.shoppinCar];
          const  addBillId = copyItems.map((d:any)=>({...d, id:null,billId:bill.id}));
          let myDataShop:any = {};
          myDataShop.items = addBillId;
          console.log(myDataShop.items);
          this.createBillDetails.createBillDetails(myDataShop.items).subscribe({
            next:(res)=>{
              console.log(res);
              this.completeBuySave = true;
            }
          });
      },
      error:(error)=>{console.log(error)},
      complete:()=>{console.log("Complete save creation bill")}
    });
  }



  /* returns  */

  returnCatalogue():void{
    console.log("return catalogue");
    this.changeModal();
    this.completeBuySave = false;
    this.carshopService.clearItems();
    this.router.navigate(['/catalogue']);
    this.detailsCustomer=[];
  }

  returnHome():void{
    console.log("return hombe");
    this.changeModal();
    this.completeBuySave = false;
    this.carshopService.clearItems();
    this.detailsCustomer=[];
    this.router.navigate(['/home']);
  }
}
