import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FindcustomerService } from '../../../core/services/find/findcustomer.service';
import { CreateiBllService } from '../../../core/services/bill/createBill.service';
import { BillDetailsService } from '../../../core/services/bill_details/bill-details.service';
import { debounceTime, Observable } from 'rxjs';
import { CreatecustomerService } from '../../../core/services/customer/createcustomer.service';
import { CommonModule } from '@angular/common';
import { BuyComponent } from '../../products/pages/buy/buy.component';
import { CarshopService } from '../../../core/services/carshop/carshop.service';

@Component({
  selector: 'app-findperson',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, BuyComponent],
  providers:[FindcustomerService, CreateiBllService, BillDetailsService, CreatecustomerService,],
  templateUrl: './findperson.component.html',
  styleUrl: './findperson.component.css'
})
export class FindpersonComponent implements OnInit{

  
  backCatalogue:boolean=false;
  aplicarEstilo1: boolean = true;
  
   public findCustomer : FormGroup;
   detailsUser:{cardId:number, fullName:string, email:string, cellPhone:number}[]=[];
   userNotFund:string="";
   searchCustomer = inject(FindcustomerService);
   private carshopService = inject(CarshopService);
   

  
  constructor(private fb2: FormBuilder, private createCustomerService: CreatecustomerService){


    this.findCustomer = this.fb2.group({
      cardId:['', [Validators.required]]
    });       
  }
  ngOnInit(): void {
    this.detailsUser = [];
  }
      
  findCustomerButton():void{
    this.detailsUser=[];
    console.log(this.findCustomer.value);
    this.searchCustomer.findCustomer(this.findCustomer.get('cardId')?.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.detailsUser.push(res.body);
        console.log(this.detailsUser);
        this.userNotFund = "User find";
        this.carshopService.addCustomerId(res.body.cardId);
        console.log(this.carshopService.getCustomerId());
      },
      error:(error)=>{
        console.log(error.error);
        this.userNotFund = "User not find";
      },
      complete:()=>{console.log("Petition complete");}
    })
  }

}
