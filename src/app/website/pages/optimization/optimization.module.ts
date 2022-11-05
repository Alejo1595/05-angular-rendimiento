import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptimizationRoutingModule } from './optimization-routing.module';
import { OptimizationComponent } from './optimization.component';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OptimizationComponent
  ],
  imports: [
    CommonModule,
    OptimizationRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class OptimizationModule { }
