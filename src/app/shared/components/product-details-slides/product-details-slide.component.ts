import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { NgxGlideComponent } from 'ngx-glide';

import { Product } from '../../../model/product.model';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-product-details-slide',
  templateUrl: './product-details-slide.component.html',
  styleUrls: ['./product-details-slide.component.scss']
})
export class ProductDetailsSlideComponent implements AfterViewInit {

  @ViewChild('ngxGlide') ngxGlide!: NgxGlideComponent;

  @Input()
  public product!: Product;

  @Input()
  public updateProduct!: () => void;

  @Input()
  public deleteProduct!: () => void;

  public getImage = () => this.product?.images[0];

  constructor(private storeService: StoreService) { }

  public addToProduct = (): void => this.storeService.addProduct(this.product);

  ngAfterViewInit(): void {
    this.configurateSlider();
  }

  private configurateSlider = () => {
    this.ngxGlide.autoplay = 3000;
    this.ngxGlide.rewind = true;
    this.ngxGlide.recreate()
  }
}
