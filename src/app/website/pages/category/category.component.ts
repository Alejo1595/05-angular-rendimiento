import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Product } from '../../../model/product.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {

  public productList: Product[] = [];

  private limit = 5;
  private offset = 0;
  private categoryId: string = '';
  private unsubscribe$ = new Subject<boolean>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  public loadMore(): void {
    this.offset += this.limit;
    this.productService.getByCategory(this.categoryId, this.limit, this.offset)
      .subscribe((productList: Product[]) => this.productList = [...this.productList, ...productList])
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  private getInitialData(): void {
    this.activatedRoute.paramMap
      .pipe(
        takeUntil(this.unsubscribe$),
        map(params => params.get('id')),
        filter((categoryId: string | null) => !!categoryId),
        map((categoryId: string | null) => `${categoryId}`),
        tap((categoryId: string) => this.categoryId = categoryId),
        tap(() => this.resetDataPagination()),
        switchMap((categoryId) => this.productService.getByCategory(categoryId, this.limit, this.offset)),
        tap((productList: Product[]) => this.productList = productList),
      ).subscribe();
  }

  private resetDataPagination = (): void => {
    this.productList = [];
    this.limit = 5;
    this.offset = 0;
  }

}
