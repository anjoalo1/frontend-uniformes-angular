import { Component, EventEmitter, inject, NgModule, OnInit, Output } from '@angular/core';
import { ProductsService } from '../../../../core/services/products/products.service';
import { FormsModule } from '@angular/forms';
import { CarshopService } from '../../../../core/services/carshop/carshop.service';

@Component({
  selector: 'app-loadproducts',
  standalone: true,
  imports: [FormsModule],
  providers:[ProductsService ],
  templateUrl: './loadproducts.component.html',
  styleUrl: './loadproducts.component.css'
})
export class LoadproductsComponent implements OnInit{

  products:any[]=[];
  categoryProducts:any[]=[];
  shopingCart:any[]=[];
  simpleCategory:any[]=[];


  private carshopService = inject(CarshopService);

  constructor(private loadProducts: ProductsService){

  }
  ngOnInit(): void {

    this.loadProducts.loadProdudcts().subscribe({
      next:(res)=>{
        console.log(res);
        this.products.push(res);
        console.log(this.products);
        const  addAmount = res.map((d:any)=>({...d, amount:1, total:d.price}));
        const cambio:any[] = [...addAmount];
        this.products = cambio.map(({id, ...rest})=>({idProduct:id, ...rest}));
        console.log(this.products);

        /* this.categoryProducts = [...this.products.filter(p=>p.type==="camibuso")];
        console.log("category products", this.categoryProducts); */

        this.simpleCategory =[...this.products.map(product=>product.type).filter((type, index, self)=>self.indexOf(type)==index)]
        console.log(this.simpleCategory);

        /* this.products = [...this.categoryProducts]; */
      },
      error:(error)=>{
        console.log(error);
      },
      complete:()=>{console.log("se completo la consulta")}
    })
  }



  incrementProduct(idx:number):void{
    this.products[idx].amount+=1
    this.products[idx].total = this.products[idx].amount * this.products[idx].price;
  }

  derrementProduct(idx:number):void{
    if(this.products[idx].amount<=1)return;
    else{

      this.products[idx].amount-=1
      this.products[idx].total = this.products[idx].amount * this.products[idx].price;
    } 
  }


  addShopingCart(id:number, amount:number):void{



    
    const searchDuplicated = this.shopingCart.find(p=>p.idProduct === id);
    console.log(searchDuplicated, "cantidad",amount);

    if(searchDuplicated!=undefined){
      let searchIndex = this.shopingCart.findIndex(p=>p.idProduct ==id);
      let cantidad = this.shopingCart[searchIndex].amount + amount;
      this.shopingCart[searchIndex].amount = cantidad;
      console.log("cantidad despues de sumar", this.shopingCart[searchIndex].amount);
      this.shopingCart[searchIndex].total = this.shopingCart[searchIndex].price * this.shopingCart[searchIndex].amount;
      console.log(this.shopingCart);
    }else{
      const addProduct={...this.products.find(p=>p.idProduct===id)};
      this.shopingCart.push(addProduct);
      console.log(this.shopingCart);
    }
    this.carshopService.addItems(this.shopingCart);
  }


  showCarShopingComponent():void{
    this.carshopService.addItems(this.shopingCart);
  }


   // Función que se ejecuta cuando se selecciona un producto
   onProductChange(productId: string | null) {
    console.log('Producto seleccionado:', productId);

   if(productId=="todos"){
    this.categoryProducts =[...this.products];
   }else{
    this.categoryProducts = this.products.filter(p=>p.type==productId);
    console.log(this.categoryProducts);
   }
    // Aquí puedes agregar más lógica según tus necesidades
  }

  selectedProductId: string | null = "todos"; // Para almacenar el ID del producto seleccionado

}
