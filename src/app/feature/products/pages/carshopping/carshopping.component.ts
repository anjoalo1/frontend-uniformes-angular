import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carshopping',
  standalone: true,
  imports: [],
  templateUrl: './carshopping.component.html',
  styleUrl: './carshopping.component.css'
})
export class CarshoppingComponent {

  @Input() myCarShopping:any[]=[];

}
