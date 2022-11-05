import { NgModule } from '@angular/core';
import { RouterModule, Routes, /* CanDeactivate */ } from '@angular/router';

import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { LayoutComponent } from './components/layout/layout.component';

import { AuthGuard } from '../guards/auth.guard';
import { ExitGuard } from '../guards/exit.guard';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MyCartComponent } from './pages/my-cart/my-cart.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { RegisterComponent } from './pages/register/register.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'category',
        loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule),
        data: {
          preload: true
        }
      },
      {
        path: 'optimization',
        loadChildren: () => import('./pages/optimization/optimization.module').then(m => m.OptimizationModule),
        data: {
          preload: true
        }
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'car',
        component: MyCartComponent
      },
      {
        path: 'product/:id',
        component: ProductDetailsComponent
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        component: ProfileComponent
      },
      {
        path: 'recovery',
        component: RecoveryComponent
      },
      {
        path: 'register',
        canDeactivate: [ExitGuard],
        component: RegisterComponent,
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
