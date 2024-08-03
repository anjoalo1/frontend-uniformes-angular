import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormfindpersonComponent } from "../../../persons/formfindperson/formfindperson.component";
import { CreatecustomerComponent } from "../../../persons/createcustomer/createcustomer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormfindpersonComponent, CreatecustomerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent  {
 myShoppinCar: any[]=[
  { "id": null,"idProduct": 1,"price": 30000,"amount": 1,"total": 30000,},
  { "id": null,"idProduct": 2,"price": 30000,"amount": 2,"total": 60000,}
 ];
  constructor(private renderer2: Renderer2){

  }



  @ViewChild('asTitle')title!: ElementRef;

  change():void{
    console.log("hola mundo");
    const asTitle = this.title.nativeElement;
    console.log(asTitle);
    this.renderer2.setStyle(asTitle, 'color', 'red');
    
    
  }

  showP():void{
    console.log("hola mundo desde p");
  }

}


function ViewChildiewChild(arg0: string): (target: HomeComponent, propertyKey: "title") => void {
  throw new Error('Function not implemented.');
}

