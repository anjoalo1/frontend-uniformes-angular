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
import { FormfindpersonComponent } from "../../../persons/formfindperson/formfindperson.component";
import { FormsModule } from '@angular/forms';
import { CreatecustomerComponent } from "../../../persons/createcustomer/createcustomer.component";
import { BuyComponent } from "../buy/buy.component";


@Component({
  selector: 'app-catalogue',
  standalone: true,
  providers:[SendtokenserviceService, RouterModule, TokenService],
  imports: [FindpersonComponent, LoadproductsComponent, CarshoppingComponent, CommonModule, FormfindpersonComponent, FormsModule, CreatecustomerComponent, BuyComponent],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.css'
})
export default class CatalogueComponent implements OnInit{




  carShopt:any[]=[];
  Total: number=0;
  showFindPerson:boolean=false;
  isActive: boolean = false; // Inicialmente activo
  selectedOption:string="";
  constructor(private catalogue:SendtokenserviceService, private tokenDelete: TokenService, private router: Router){
    
  }


  ngOnInit(): void {
    this.isActive=false;
    this.showFindPerson= false;
    this.selectedOption="";
  }

  sumarTotal(){
    const sumaPrecios: number = this.carShopt.reduce((acumulador, producto) => {
      return acumulador + producto.total;
    }, 0);
    
    console.log(this.carShopt);
    this.Total = sumaPrecios;
  }
  
  showCarShopping():void{

      console.log("sho car shopin now");
      this.isActive = !this.isActive; // Cambia el valor de isActive 
  }


  showCreateBill():void{
      this.showFindPerson = true;
  }
}
