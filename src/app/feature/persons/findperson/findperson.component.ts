import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FindcustomerService } from '../../../core/services/find/findcustomer.service';
import { CreateiBllService } from '../../../core/services/bill/createBill.service';
import { BillDetailsService } from '../../../core/services/bill_details/bill-details.service';
import { debounceTime, Observable } from 'rxjs';
import { CreatecustomerService } from '../../../core/services/customer/createcustomer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-findperson',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  providers:[FindcustomerService, CreateiBllService, BillDetailsService, CreatecustomerService,],
  templateUrl: './findperson.component.html',
  styleUrl: './findperson.component.css'
})
export class FindpersonComponent {


  backCatalogue:boolean=false;
  aplicarEstilo1: boolean = true;

 /*  changeModal(){
    this.aplicarEstilo1 == true? this.aplicarEstilo1 = false : this.aplicarEstilo1 = true;
  }
 */
  public customer: FormGroup;
  public findCustomer : FormGroup;
  detailsUser:any[]=[];
  userNotFund:string="";
  /* selectOption:string="";
  userFindApi:any ={};
  statusUserFindAPi:number=0;
  userNotFoundBoolean:boolean=false;
  customerId:number=0;
  errorCreateCustomer:string="";
  succesfullCreateCustomer:boolean=false; */


  searchCustomer = inject(FindcustomerService);
  

 
  constructor(private fb: FormBuilder, private fb2: FormBuilder,
    private createBill: CreateiBllService, private createBillDetails: BillDetailsService,
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
      
  findCustomerButton():void{
    this.detailsUser=[];
    console.log(this.findCustomer.value);
    this.searchCustomer.findCustomer(this.findCustomer.get('cardId')?.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.detailsUser.push(res.body);
        console.log(this.detailsUser);
        this.userNotFund = "User find";
      },
      error:(error)=>{
        console.log(error.error);
        this.userNotFund = "User not find";
      },
      complete:()=>{console.log("Petition complete");}
    })
  }

}
