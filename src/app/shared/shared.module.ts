import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { QuicklinkModule } from 'ngx-quicklink';

import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { HighLightDirective } from './directive/high-light.directive';

import { ImgComponent } from './components/img/img.component';
import { ItemsMenuComponent } from './components/items-menu/items-menu.component';
import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ProductDetailsSlideComponent } from './components/product-details-slides/product-details-slide.component';
import { NgxGlideModule } from 'ngx-glide';

@NgModule({
  declarations: [
    HighLightDirective,
    TimeAgoPipe,
    ImgComponent,
    ItemsMenuComponent,
    ProductComponent,
    ProductListComponent,
    SideNavComponent,
    ProductDetailsSlideComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxGlideModule,
    QuicklinkModule
  ],
  exports: [
    ImgComponent,
    ItemsMenuComponent,
    ProductComponent,
    ProductListComponent,
    SideNavComponent,
    ProductDetailsSlideComponent,
  ]
})
export class SharedModule { }
