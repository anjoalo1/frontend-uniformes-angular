import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FindcustomerService } from '../../../core/services/find/findcustomer.service';
import { CreateillService } from '../../../core/services/bill/createill.service';

@Component({
  selector: 'app-findperson',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  providers:[FindcustomerService, CreateillService],
  templateUrl: './findperson.component.html',
  styleUrl: './findperson.component.css'
})
export class FindpersonComponent {
  @Input() items: any;

  public customer: FormGroup;
  public findCustomer : FormGroup;
  selectOption:string="";
  userFindApi:any ={};
  statusUserFindAPi:number=0;
  userNotFund:string="";
  detailsUser:any[]=[];

  constructor(private fb: FormBuilder, private fb2: FormBuilder, private findCustomerService: FindcustomerService,
    private createBill: CreateillService
  ){

    this.customer = this.fb.group({
      cardId:['', [Validators.required]],
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      cellPhone: ['', [Validators.required]],
      isActive: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]

   });

   this.findCustomer = this.fb2.group({
    cardId:['', [Validators.required]]
   /*  fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    role: ['', [Validators.required]],
    ellPhone: ['', [Validators.required]], */
   });

  }
  
  /* create customer */
  createCustomer():void{
    this.customer.get('role')?.setValue('customer');
    this.customer.get('isActive')?.setValue(1);
    console.log(this.customer.value);
  }

  /* search customer by id */

  findCustomerForm():void{
    console.log(this.findCustomer.value);
    const result = this.findCustomerService.findCustomer(this.findCustomer.get('cardId')?.value);


    let fechaISO: string = new Date().toISOString();
    console.log("fecha iso",fechaISO);

    let customerId = 12;
    
    const dateNow = new Date();
    const dateNowString = new Date();
    /* console.log("con toString",dateNowString.toString()); */
   const dateNowPasar = this.formatearFechaCompleta2(dateNowString);
    let datos:any = {};
    datos.mifecha = dateNowString;
    console.log("datos",datos);
    console.log(dateNow);
    const formatDateNow=this.formatearFecha(dateNow);
    const formatDateNowString = this.formatearFechaCompleta2(dateNow);
    
    let myDataShop:any = {};
    /* myDataShop.fecha = formatDateNow;
    myDataShop.fechastring= formatDateNowString; */
    myDataShop.fechaSinFormato= dateNow;
    myDataShop.items = this.items;
    
    let bill:any = {id:dateNowPasar, billDate:dateNowPasar,customerId:12};
    console.log("bill", bill);
      console.log(myDataShop);
      console.log(myDataShop.items.data);

      this.createBill.createBill(bill);





      /* const ahoraFormateado:string = this.formatearFecha(new Date());
      console.log(ahoraFormateado); */ 
      
      result.subscribe(res=>{

        this.statusUserFindAPi = res.status;
        if(this.statusUserFindAPi!==200){
        }else{
          this.detailsUser = [];
          this.userFindApi.user = res.body
          console.log(this.userFindApi, "status", this.statusUserFindAPi);
          this.userNotFund="User Find";
          this.detailsUser.push(res.body);
          console.log(this.detailsUser);
          
        }
    },
      error=>{
        console.log(error, "user not found");
        this.userNotFund="User not found";
        this.detailsUser=[];
      }
    );
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
        /* const milisegundos = String(fecha.getMilliseconds()).padStart(3, '0'); */
        
    
        return `${anio}-${mes}-${dia}T${hora}:${minutos}:${segundos}`;
    }






}
