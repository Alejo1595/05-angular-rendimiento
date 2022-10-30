import { Component, Input, Output, EventEmitter } from '@angular/core';
import { filter, tap } from 'rxjs';

import { Product, CreateProductDTO, UpdateProductDTO } from '../../../model/product.model';
import { productMock } from '../../../util/product.util';

import { StoreService } from '../../../services/store.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {

  @Input()
  public productList: Product[] = [];

  @Output()
  public isLoadMore = new EventEmitter<boolean>();

  public totalPrice: number = 0;
  public isMenuOpen: boolean = false;
  public productSelected: Product = { ...productMock }

  constructor(
    private storeService: StoreService,
    private productService: ProductService
  ) { }

  public addToCar(product: Product) {
    this.storeService.addProduct(product);
    this.totalPrice = this.storeService.getTotal();
  }

  public showProductDetail = (product: Product) => {
    this.toggleMenu();
    this.productSelected = product;
  }

  public toggleMenu = () => {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen === false) {
      this.productSelected = { ...productMock };
    }
  }

  public loadMore = () => this.isLoadMore.emit();

  public createProduct = () => {
    const productDTO: CreateProductDTO = {
      title: 'Nuevo producto',
      price: 1000,
      description: 'Lorem ipsum dolor sit amet consectetur',
      categoryId: 1,
      images: [
        'https://placeimg.com/640/480/any?random=$%7BMath.random()%7D',
        'https://placeimg.com/640/480/any?random=$%7BMath.random()%7D',
        'https://placeimg.com/640/480/any?random=$%7BMath.random()%7D'
      ]
    }

    this.productService.create(productDTO)
      .subscribe((product) => this.productList = [...this.productList, product]);
  }

  public updateProduct = () => {
    const change: UpdateProductDTO = { title: 'Nuevo cambio!!!' };
    const id = this.productSelected.id;
    this.productService.update(id, change)
      .subscribe(data => {
        this.productSelected = { ...data };
        this.productList = this.productList.map(product => product.id === data.id ? data : product)
      });
  }

  public deleteProduct = () => {
    this.productService.delete(this.productSelected.id)
      .pipe(
        filter((data: boolean) => data),
        tap(() => this.productList = this.productList.filter(({ id }) => this.productSelected.id !== id)),
        tap(() => this.toggleMenu())
      ).subscribe();
  };

  public fetch = () => {
    this.productService.fetchDeleteAndUpdate(this.productSelected.id)
      .subscribe(res => {
        const [isDelete, productUpdated] = res;
        console.log({ isDelete, productUpdated })
      })
  }
}
