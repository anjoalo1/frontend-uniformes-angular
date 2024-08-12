import { Component, OnInit } from '@angular/core';
import { SendtokenserviceService } from '../../../../core/services/sendtoken/sendtokenservice.service';
import { Router, RouterModule } from '@angular/router';
import { ProductDto } from '../../../../core/dto/productDto';
import { find } from 'rxjs';
import { FindpersonComponent } from "../../../persons/findperson/findperson.component";
import { TokenService } from '../../../../core/services/token/token.service';
import { LoadproductsComponent } from "../loadproducts/loadproducts.component";
import { CarshoppingComponent } from "../carshopping/carshopping.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-catalogue',
  standalone: true,
  providers:[SendtokenserviceService, RouterModule, TokenService],
  imports: [FindpersonComponent, LoadproductsComponent, CarshoppingComponent, CommonModule],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.css'
})
export default class CatalogueComponent implements OnInit{



  myProducts:any[]=[];
  carShopt:any[]=[];
  Total: number=0;
  shoppingNow:boolean=false;
  carShoptSendBD: any[]=[];
  itemsFhater:any={};
  constructor(private catalogue:SendtokenserviceService, private tokenDelete: TokenService, private router: Router){
    
  }

  ngOnInit(): void {
    this.catalogue.sendHeader().subscribe({
        next:(res)=>{
          const  addAmount = res.map((d:any)=>({...d, amount:1, total:0}));
          this.myProducts=[...addAmount];
        },
        error:(status)=>{
          console.log("status", status);
          console.log("status", status.status);
          if(status.status==401){
            this.tokenDelete.deleteToken();
            this.router.navigate(['/login'])
            //console.log("el error es 401")
          }
          
        } 
    })
  }
   addCartBuy(itemId:number, amount:number){
      console.log(itemId);
      const findDuplicity =  this.carShopt.find((pro)=>pro.id===itemId);
      
      if(findDuplicity !== undefined){

        let cantidad = 0;
        let total =0;

        let duplicy = {...findDuplicity};
        cantidad = duplicy.amount + amount;
        duplicy.amount = cantidad;
        total = duplicy.amount * duplicy.price;
        duplicy.total = total;
        let myNewArray = this.carShopt.filter(objeto=>objeto.id !== itemId)
        this.carShopt=[...myNewArray];
        this.carShopt.push(duplicy);
        this.sumarTotal();
        console.log(this.Total);
        
      }else{
        const productAdd={...this.myProducts.find((pro)=>pro.id===itemId)};
        productAdd.total = productAdd.amount * productAdd.price;
        this.carShopt.push(productAdd);
        this.sumarTotal();
        console.log(this.Total);
     }
  }

  increment(amount:number, itemId:number,idx:number){

    this.myProducts[idx].amount +=1;
  }

  decrement(amount:number, itemId:number,idx:number){
    if(this.myProducts[idx].amount<=0){
      
    }else this.myProducts[idx].amount -=1;
  }

  incremenetShopinCart(id:number):void{
    if(this.carShopt[id].amount<=0)return
    else {
      this.carShopt[id].amount+=1;
      this.carShopt[id].total = this.carShopt[id].amount * this.carShopt[id].price;
    }
    this.sumarTotal();
  }

  decrementShopinCart(id:number):void{
    if(this.carShopt[id].amount<=1)return
    else {
      this.carShopt[id].amount-=1;
      this.carShopt[id].total = this.carShopt[id].amount * this.carShopt[id].price;
    }
    this.sumarTotal();
  }



  sumarTotal(){
    const sumaPrecios: number = this.carShopt.reduce((acumulador, producto) => {
      return acumulador + producto.total;
    }, 0);

    console.log(this.carShopt);
    this.Total = sumaPrecios;
  }

  sendShoppingNow():void{

    if(this.carShopt.length<=0){
      
    }else{

      console.log("shoppingNow");
      this.shoppingNow=true;
      console.log(this.carShopt);
  
      let formatCarShop  = this.carShopt.map(({id, description, nameProduct, size, type, ...rest})=>({idProduct:id, ...rest}));
      console.log(formatCarShop);
      let addDateId = formatCarShop.map((d:any)=>({...d, }))
  
      this.itemsFhater = {
        data: formatCarShop
      }
      this.carShoptSendBD =[...formatCarShop];
    }
  }

  generateBill(){
    let fechaISO: string = new Date().toISOString();
    console.log(fechaISO);

// Imprimir la fecha actual
    let myBody ={
      id:fechaISO,
      dateBill:fechaISO,
      customerId:16
    }

    this.catalogue.sendPostBill(myBody);
  }



  addItem(newItem: boolean) {
    this.shoppingNow=newItem;
    this.carShopt=[];
    this.sumarTotal();
  }



  /* catalogue new */
  showCarShopping(){
    console.log("sho car shopin now");
    
      this.isActive = !this.isActive; // Cambia el valor de isActive
    
  }




  isActive: boolean = false; // Inicialmente activo


  // Función para alternar el estado de isActive
  

}
