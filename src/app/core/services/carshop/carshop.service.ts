import { Injectable, Signal, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarshopService {

  constructor() { }
  // Crear un BehaviorSubject que inicializa con un arreglo vacío
  private itemsSubject = new BehaviorSubject<any[]>([]);
  items = this.itemsSubject.asObservable(); // Exponer el Observable



  // Método para obtener el arreglo actual
  getItems(): any[] {
    return this.itemsSubject.getValue(); // Obtener el valor actual del BehaviorSubject
  }

  // Método para agregar elementos al arreglo
  addItems(newItems: any[]): void {
    this.itemsSubject.next([...newItems]); // Emitir el nuevo arreglo
  }

  // Método para limpiar el arreglo
  clearItems(): void {
    this.itemsSubject.next([]); // Emitir un arreglo vacío
  }

}
