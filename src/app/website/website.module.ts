import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'


import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MyCartComponent } from './pages/my-cart/my-cart.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from '../not-found/not-found.component';

import { HeaderComponent } from './components/header/header.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { LayoutComponent } from './components/layout/layout.component';

import { WebsiteRoutingModule } from './website-routing.module';


@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    MyCartComponent,
    NotFoundComponent,
    ProductDetailsComponent,
    ProfileComponent,
    RecoveryComponent,
    RegisterComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class WebsiteModule { }
