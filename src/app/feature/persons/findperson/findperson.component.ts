import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FindcustomerService } from '../../../core/services/find/findcustomer.service';
import { CreateillService } from '../../../core/services/bill/createBill.service';
import { BillDetailsService } from '../../../core/services/bill_details/bill-details.service';
import { debounceTime, Observable } from 'rxjs';
import { CreatecustomerService } from '../../../core/services/customer/createcustomer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-findperson',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  providers:[FindcustomerService, CreateillService, BillDetailsService, CreatecustomerService,],
  templateUrl: './findperson.component.html',
  styleUrl: './findperson.component.css'
})
export class FindpersonComponent {
  @Input() items: any;
  @Output() newItemEvent = new EventEmitter<boolean>();
  isActive: any;

  addNewItem(value: boolean) {
    this.newItemEvent.emit(value);
  }

  backCatalogue:boolean=false;
  aplicarEstilo1: boolean = true;

  changeModal(){
    this.aplicarEstilo1 == true? this.aplicarEstilo1 = false : this.aplicarEstilo1 = true;
  }

  public customer: FormGroup;
  public findCustomer : FormGroup;
  selectOption:string="";
  userFindApi:any ={};
  statusUserFindAPi:number=0;
  userNotFund:string="";
  userNotFoundBoolean:boolean=false;
  detailsUser:any[]=[];
  customerId:number=0;
  errorCreateCustomer:string="";
  succesfullCreateCustomer:boolean=false;

  

  customerValidator = {
    cardId:"no valido",
    fullAnme:"no valido",
    email:"no valido",
    cellPhone:"no valido"
  }

  constructor(private fb: FormBuilder, private fb2: FormBuilder, private findCustomerService: FindcustomerService,
    private createBill: CreateillService, private createBillDetails: BillDetailsService,
    private createCustomerService: CreatecustomerService
  ){

      this.customer = this.fb.group({
        cardId:['', [Validators.required, Validators.pattern('^[0-9]*$') ]],
        fullName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        role: ['', [Validators.required]],
        cellPhone: ['', [Validators.required]],
        isActive: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]

    });

    this.findCustomer = this.fb2.group({
      cardId:['', [Validators.required]]
    });       
  }
      

  /* create customer */
  createCustomer():void{
    this.customer.get('role')?.setValue('customer');
    this.customer.get('isActive')?.setValue(1);
    console.log("datos formulario", this.customer.value);

    this.createCustomerService.createCustomer(this.customer.value).subscribe({next:(res)=>{
      console.log(res);
      this.customerId = res.cardId;
      console.log("datos antes de guardar", this.customerId);
      this.errorCreateCustomer = `Usuario creado corectamente`;
      this.succesfullCreateCustomer=true;
      this.changeModal();
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

  /* search customer by id */

  findCustomerForm():void{
    const result = this.findCustomerService.findCustomer(this.findCustomer.get('cardId')?.value);
      result.subscribe({next:(res)=>{

        this.statusUserFindAPi = res.status;
        if(this.statusUserFindAPi!==200){
        }else{
          this.detailsUser = [];
          this.userFindApi.user = res.body
          console.log(this.userFindApi, "status", this.statusUserFindAPi);
          this.userNotFund="User Find";
          this.userNotFoundBoolean=true;
          this.detailsUser.push(res.body);
          this.customerId = res.body.customerId;
          console.log("details user",this.detailsUser);
          this.customerId = res.body.cardId;
          
        }
      },
      error:(error)=>{
        console.log(error, "user not found");
        this.userNotFund="User not found";
        this.userNotFoundBoolean=false;
        this.detailsUser=[];
      },
      complete:()=>{
        console.log("Se completo la peticion")
      }
    });
      
      
  }


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
          const copyItems  =[...this.items.data];
          const  addBillId = copyItems.map((d:any)=>({...d, id:null,billId:bill.id}));
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


  saveBillBD2(customerId:number):void{
    console.log(customerId);
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
          const copyItems  =[...this.items.data];
          const  addBillId = copyItems.map((d:any)=>({...d, id:null,billId:bill.id}));
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


        formatearFecha(fecha: Date): { anio: number, mes: number, dia: number, hora: number, minutos: number, segundos: number } {
          return {
              anio: fecha.getFullYear(),
              mes: fecha.getMonth() + 1, // Los meses en JavaScript son 0-indexados
              dia: fecha.getDate(),
              hora: fecha.getHours(),
              minutos: fecha.getMinutes(),
              segundos: fecha.getSeconds()
          };   
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
