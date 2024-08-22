import { Component, inject, Input, input, OnInit } from '@angular/core';
import { BillDetailsService } from '../../../../core/services/bill_details/bill-details.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CarshopService } from '../../../../core/services/carshop/carshop.service';

@Component({
  selector: 'app-buy',
  standalone: true,
  imports: [],
  providers:[BillDetailsService],
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.css'
})
export class BuyComponent implements OnInit{

@Input() customerIdInputValue:number | undefined=0;

  shoppinCar:any[]=[];
  customerCardId:number | undefined= undefined;
  private saveBill = inject(BillDetailsService);

  private carshopService = inject(CarshopService);


  ngOnInit(): void {
    this.carshopService.items.subscribe(updateItems=>{
      this.shoppinCar = updateItems;
    });

    this.carshopService.customer.subscribe(updateCustomer=>{
      this.customerCardId = updateCustomer;
    })

this.customerIdInputValue=0;
  }





  addBillId: any[]=[];


  removeData():void{

    const customerId = 12;
    //const arrayBuy = this.buyArray.map(({}=>{}))
    let dateBill = this.formatearFechaCompleta2(new Date());
    let bill:any = {id:dateBill, billDate:dateBill,customerId:this.customerCardId};

    console.log(bill);

    //const copyItems  =[...this.buyArray];

    //let formatCarShop  = copyItems.map(({ description, nameProduct, size, type, ...rest})=>({ ...rest}));

/*     const newArray:any = [...copyItems.map(person => {
      const {description, nameProduct, size, type, ...rest } = person;
      return rest;
      
  })]; */


  const fechaTemporal='2024-08-12T16:03:53.006';


   const newArray1 = [...this.shoppinCar.map(({ description, nameProduct, size, type, ...rest }) =>({id:null, billId:fechaTemporal, ...rest }))]; 

/* console.log(newArray); */

  
      //this.addBillId = copyItems.map((d:any)=>({...d, id:null,billId:bill.id}));

     /* this.shoppinCar = this.carshopService.update(); */

    console.log("remove data", this.shoppinCar, "card id",  this.customerCardId);
    console.log("new array", newArray1, "card id",  this.customerCardId);
    console.log(this.carshopService.getCustomerId(), dateBill);

    /* this.saveBill.createBillDetails(newArray1).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(error)=>{console.log(error)},
      complete:()=>{console.log("Saved complete")}
    }); */
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
