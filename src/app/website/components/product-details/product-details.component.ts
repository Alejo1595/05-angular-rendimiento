import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

import { Subject } from 'rxjs';
import { takeUntil, map, filter, tap, switchMap, delay } from 'rxjs/operators';

import { Product } from '../../../model/product.model';
import { ProductService } from '../../../services/product.service';

import { NgxGlideComponent } from 'ngx-glide';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  @ViewChild('ngxGlide') ngxGlide!: NgxGlideComponent;

  public productId: string = '';
  public productDetails: Product | null = null;

  private unsubscribe$ = new Subject<boolean>();

  constructor(
    private activeRounter: ActivatedRoute,
    private location: Location,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  public goToBack = () => this.location.back();

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  private getInitialData(): void {
    this.activeRounter.paramMap
      .pipe(
        takeUntil(this.unsubscribe$),
        map(params => params.get('id')),
        filter((productId: string | null) => !!productId),
        map((productId: string | null) => `${productId}`),
        tap((productId: string) => this.productId = productId),
        switchMap(() => this.productService.getOne(this.productId)),
        tap((product: Product) => this.productDetails = product),
        delay(10),
        tap(this.configurateSlider),
      ).subscribe();
  }

  private configurateSlider = () => {
    this.ngxGlide.autoplay = 3000;
    this.ngxGlide.rewind = true;
    this.ngxGlide.recreate()
  }

}
