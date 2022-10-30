import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCar: Product[] = [];

  get getShoppingCar() {
    return this.myShoppingCar;
  }

  public addProduct = (product: Product): void => {
    this.myShoppingCar = [...this.myShoppingCar, product]
  };

  public getTotal = () => this.myShoppingCar.reduce((sum, act) => act.price + sum, 0);
}
