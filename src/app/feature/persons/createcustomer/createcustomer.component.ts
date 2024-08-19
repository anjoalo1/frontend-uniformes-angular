import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreatecustomerService } from '../../../core/services/customer/createcustomer.service';
import { FindcustomerService } from '../../../core/services/find/findcustomer.service';
import { CreateiBllService } from '../../../core/services/bill/createBill.service';
import { BillDetailsService } from '../../../core/services/bill_details/bill-details.service';
import { CarshopService } from '../../../core/services/carshop/carshop.service';

@Component({
  selector: 'app-createcustomer',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  providers:[CreatecustomerService, FindcustomerService, CreateiBllService, BillDetailsService],
  templateUrl: './createcustomer.component.html',
  styleUrl: './createcustomer.component.css'
})
export class CreatecustomerComponent implements OnInit {


  items: any;
  shoppinCar: any[]=[];

  private carshopService = inject(CarshopService);

  constructor(private fb: FormBuilder, private createCustomerService: CreatecustomerService, private findCustomerService: FindcustomerService,
    private createBill: CreateiBllService, private createBillDetails: BillDetailsService
  ){

    this.customer = this.fb.group({
      cardId:['', [Validators.required, Validators.pattern('^[0-9]*$') ]],
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      cellPhone: ['', [Validators.required]],
      isActive: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
  
  });
  }
  ngOnInit(): void {
    this.shoppinCar= this.carshopService.getItems();

  /*   this.itemService.items.subscribe(updatedItems => {
      this.items = updatedItems; // Actualizar el arreglo local
    }); */

    this.carshopService.items.subscribe(updateItems=>{
      this.shoppinCar = updateItems;
    })
  }


  public customer: FormGroup;
  errorCreateCustomer:string="";
  customerId:number=0;
  succesfullCreateCustomer:boolean=false;
  aplicarEstilo1: boolean = true;
  customerCreatedData:any[]=[];




  /* funciones */

  createCustomer():void{

    console.log(this.customer.value);

    this.customer.get('role')?.setValue('customer');
    this.customer.get('isActive')?.setValue(1);
    console.log("datos formulario", this.customer.value);

    this.createCustomerService.createCustomer(this.customer.value).subscribe({next:(res)=>{
      console.log(res);
      this.customerId = res.cardId;
      this.customerCreatedData = [];
      this.customerCreatedData.push(res);
      console.log("datos customer created", this.customerCreatedData);
      console.log("datos antes de guardar", this.customerId);
      this.errorCreateCustomer = `Usuario creado corectamente`;
      this.succesfullCreateCustomer=true;
      /* this.changeModal(); */
      //this.saveBillBD2(this.customerId);
    },
    error:(error)=>{
      console.log("un errror", error)
      this.errorCreateCustomer = `Error al crear usuario: ${error.error.ERROR}`;
    },
    complete:()=>{
      console.log("se completo la transaccion");
      this.errorCreateCustomer = `Usuario creado corectamente`;
      //this.saveBillBD();
    }
    
    
  })
    
  }

  findCustomer(id:number):void{
    this.findCustomerService.findCustomer(id).subscribe({
      next:(res)=>{
        console.log(res);
        
      },
      error:(error)=>{
        console.log(error);
        return false;
      },
      complete:()=>{console.log("find complete customer")}
    })
  }


  changeModal(){
    this.aplicarEstilo1 == true? this.aplicarEstilo1 = false : this.aplicarEstilo1 = true;
  }

  cancelBuy():void{
    this.aplicarEstilo1 = true;
  }

  /* saveBillBD(custhomerId:number):void{
    console.log("saveBillBD");
  } */

    saveBillBD(customerId:number):void{
      const dateNowPasar = this.formatearFechaCompleta2(new Date());
      let bill:any = {id:dateNowPasar, billDate:dateNowPasar,customerId:customerId};
         
        this.createBill.createBill(bill).subscribe({
          next:(res)=>{
            console.log(res);
          },
          error:(error)=>{
            console.log(error);
          },
          complete:()=>{
            console.log("petition complete create bill");
            this.shoppinCar= this.carshopService.getItems();
            const copyItems  =[...this.shoppinCar];
            const  addBillId = copyItems.map((d:any)=>({...d,billId:bill.id}));
            let myDataShop:any = {};
            myDataShop.items = addBillId;
            this.createBillDetails.createBillDetails(addBillId).subscribe({
              next:(res)=>{console.log(res)},
              
              error:(error)=>{console.log(error)},
              complete:()=>{console.log("se completo lo guardado")}
              },
            );
  
          }
        })
  
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


}
