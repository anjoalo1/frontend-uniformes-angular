import { Component, inject, Input, OnInit } from '@angular/core';
import { CarshopService } from '../../../../core/services/carshop/carshop.service';

@Component({
  selector: 'app-carshopping',
  standalone: true,
  imports: [],
  providers:[],
  templateUrl: './carshopping.component.html',
  styleUrl: './carshopping.component.css'
})
export class CarshoppingComponent implements OnInit{

  items: any[] = [];
  totalBill:number=0;

  private carshopService = inject(CarshopService);

  constructor(){}
  ngOnInit(): void {
      // Suscribirse al Observable para recibir actualizaciones

      this.carshopService.items.subscribe(datos=>{
        console.log(datos);
        this.items = datos;
        this.sumarTotal();
      })
      
  }

 /*  @Input() myCarShopping:any[]=[]; */



 

 sumarTotal(){
  const sumaPrecios: number = this.items.reduce((acumulador, producto) => {
    return acumulador + producto.total;
  }, 0);

  //console.log(this.carShopt);
  this.totalBill = sumaPrecios;
}
}
