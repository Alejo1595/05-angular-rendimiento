import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../model/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input()
  public product!: Product;

  @Output()
  public addedProduct = new EventEmitter<Product>();

  @Output()
  public productSelected = new EventEmitter<Product>();

  public currentDate = new Date('2021-06-25');

  public addToCar() {
    this.addedProduct.emit(this.product);
  }

  public showProductDetail = () => this.productSelected.emit(this.product);

}
