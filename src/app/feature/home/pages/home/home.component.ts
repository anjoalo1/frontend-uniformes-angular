import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent  {


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

