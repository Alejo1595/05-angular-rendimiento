import { Component, OnInit } from '@angular/core';
import { Product } from '../../../model/product.model';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public productList: Product[] = [];

  private limit = 10;
  private offset = 0;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadMore();
  }

  public loadMore = () => {
    this.productService.getByPage(this.limit, this.offset).
      subscribe({
        next: (productList) => {
          this.productList = [...this.productList, ...productList];
          this.offset = this.offset + this.limit;
        },
        error: (error) => console.error(error)
      });
  }

}
